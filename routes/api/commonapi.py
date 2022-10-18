from collections import OrderedDict
import datetime as dt
import math
import os
import stripe
import stripe.error
from pathlib import Path

from quart import Blueprint
from quart import request
from quart import send_file
from quart import session
import json

import app.state
import app.settings
from app.constants.gamemodes import GameMode
from app.constants.privileges import Privileges

import zenith.utils as utils

from zenith.caching import Cache

commonapi = Blueprint('commonapi', __name__)

BANNERS_PATH = Path.cwd() / '.data/banners'

@commonapi.route('/', methods=['GET'])
async def index():
    print(app.state.web.cache)
    return {"the": "j"}


@commonapi.route('/home/', methods=['GET'])
async def home():
    return {
        "success": True,
        "articles": Cache.get('articles'),
        "recent_ranked": Cache.get('recent_ranked'),
        "most_played_24h": Cache.get('most_played_24h'),
    }, 200

# Route for getting point data for online users graph (last 24h)


@commonapi.route('/online_data/', methods=['GET'])
async def online_data():
    return {
        "success": True,
        "data": Cache.get('online_data'),
    }, 200


@commonapi.route('/leaderboard', methods=['GET'])
async def leaderboard():
    # Get arguments
    mode = request.args.get('mode', type=int, default=0)
    mods = request.args.get('mods', type=str, default='vn')
    page = request.args.get('page', type=int, default=1)
    country = request.args.get('country', type=str, default=None)
    _type = request.args.get('type', type=str, default='pp')

    # Validate args
    if mode not in range(0, 4):
        mode = 0

    if _type not in ('pp', 'plays', 'rscore'):
        _type = 'pp'

    if country is not None and country not in app.state.services.country_codes.keys():
        country = None  # None = Global lb

    if mods not in ('vn', 'rx', 'ap'):
        mods = 'vn'

    # Convert mods
    q_mode = GameMode.gulag_int_conv(mode, mods)
    # Get information abaout max page with current filters
    res1 = await app.state.services.database.fetch_val(
        "SELECT COUNT(*) FROM users u "
        "LEFT JOIN stats s ON u.id=s.id "
        "WHERE u.priv & 1 AND s.pp > 0 AND s.mode = :mode "
        "AND (u.country = :country OR :country IS NULL)",
        {'mode': q_mode, 'country': country}
    )

    # Calculate max page
    max_page = math.ceil(res1 / 50)
    del res1  # Not needed anymore

    # Page checking
    if page < 1:
        page = 1
    elif page > max_page:
        page = max_page if max_page > 0 else 1

    sort = f"s.{_type}"
    # Get actual leaderboard data
    lb = await app.state.services.database.fetch_all(
        "SELECT u.id, u.name, u.country, s.pp, "
        "s.acc, s.max_combo, s.plays, c.tag, u.clan_id "
        "FROM users u "
        "LEFT JOIN stats s ON u.id=s.id "
        "LEFT JOIN clans c ON u.clan_id=c.id "
        "WHERE u.priv & 1 AND s.pp > 0 AND s.mode = :mode "
        "AND (u.country = :country OR :country IS NULL) "
        f"ORDER BY {sort} DESC LIMIT 50 OFFSET :offset",
        {'mode': q_mode, 'country': country, 'offset': (page-1)*50}
    )
    # Convert to dict
    lb = [dict(user) for user in lb]

    return {
        "success": True,
        "data": lb,
        'args': {
            'mode': mode,
            'mods': mods,
            'country': country,
            'page': page,
            'type': _type,
        },
        'max_page': max_page,
        'gulag_mode': q_mode,
    }, 200


@commonapi.route('/no1lb', methods=['GET'])
async def no1lb():
    # Get arguments
    mode = request.args.get('mode', type=int, default=0)
    mods = request.args.get('mods', type=str, default='vn')
    country = request.args.get('country', type=str, default=None)
    _type = request.args.get('type', type=str, default='pp')

    # Validate args
    if mode not in range(0, 4):
        mode = 0

    if mods not in ('vn', 'rx', 'ap'):
        mods = 'vn'

    if _type not in ('pp', 'acc', 'plays'):
        _type = 'pp'

    if country is not None and country not in app.state.services.country_codes.keys():
        country = None  # None = Global lb

    mode = GameMode.gulag_int_conv(mode, mods)
    sort = f"s.{_type}"

    res = await app.state.services.database.fetch_val(
        "SELECT u.id "
        "FROM users u LEFT JOIN stats s ON u.id=s.id "
        "WHERE u.priv & 1 AND s.mode = :mode "
        "AND (u.country = :country OR :country IS NULL) "
        f"ORDER BY {sort} DESC LIMIT 1",
        {'mode': mode, 'country': country}
    )
    print(res)
    for ext in ('gif', 'jpg', 'png', 'jpeg'):
        if os.path.exists(BANNERS_PATH / f'{res}.{ext}'):
            imageExists = True
            break
    else:
        imageExists = False

    # Check if image exists at /banners
    return {"success": True, "userid": res, 'image': imageExists}, 200

@commonapi.route('/card_data', methods=['GET'])
async def carddata():
    #NOTE: No badges here, they should be implemented user side :trollface:
    #      Work them out using priv value

    # Get arguments
    name = request.args.get('name', type=str, default=None)
    uid = request.args.get('uid', type=int, default=None)

    # One must be present
    if name is None and uid is None:
        return {"success": False, "error": "You must specify uid or name argument"}, 400

    # Get user
    user = await app.state.services.database.fetch_one(
        "SELECT u.id, u.name, u.priv, u.country, "
        "u.latest_activity, c.tag "
        "FROM users u LEFT JOIN clans c ON u.clan_id=c.id "
        "WHERE u.name = :name OR u.id = :uid",
        {'name': name, 'uid': uid}
    )

    if user is None:
        return {"success": False, "error": "User not found"}, 200
    else:
        user = dict(user)
        # TODO: Check if requester is staff, if so allow to see hidden users
        # TODO2: Check if user has 'Privileges.HIDDEN', if so also return not found
        if not user['priv'] & Privileges.UNRESTRICTED:
            return {"success": False, "error": "User not found"}, 200

        # Get user online status from app.state.players
        p = await app.state.sessions.players.from_cache_or_sql(id=user['id'])
        user['online'] = p.online if p is not None else False

    # Determine if user has banner
    for ext in ('gif', 'jpg', 'png', 'jpeg'):
        if os.path.exists(BANNERS_PATH / f'{user["id"]}.{ext}'):
            user['has_banner'] = True
            break
    else:
        user['has_banner'] = False


    return {'success': True, 'data': user}, 200


ENDPOINT_SECRET = 'whsec_8d5cba9bc2b4182e2a858b7c2b88b661c5d50e79aef447de0c71e1e31e76b850'
stripe.api_key = 'sk_test_51LnJv1EUCKjdFhXKGsjNwfLBIEd9kS5rKLaazxjKXLkEUQjrovtHh1ZdYkePFeDc50J0mQV1bEwMwIGRET7FVHmi00rvA4e22R'
# Create webhook for stripe payment callbacks
@commonapi.route('/stripe_webhook', methods=['GET', 'POST'])
async def stripe_webhook():
    # Get raw data
    payload = await request.data
    data = json.loads(payload, object_pairs_hook=OrderedDict)
    event: stripe.Event = stripe.Event.construct_from(data, stripe.api_key)

    # Since I'm fucking dumb and I can't figure out how to verify signatures
    # Make an API request to stripe to verify the event
    try:
        event_api = stripe.Event.retrieve(event.id)
    except stripe.error.InvalidRequestError as e:
        return {"success": False, "error": "Invalid event id"}, 400
    except Exception as e:
        print(e)
        return {"success": False, "error": "Unknown error"}, 400

    del event_api # We don't need this anymore

    p_session: stripe.checkout.Session = event['data']['object']
    if event['type'] == 'checkout.session.completed':

        # Save an order in your database, marked as 'awaiting payment'
        await utils.stripe_create_order(p_session)
        # Check if the order is already paid (for example, from a card payment)
        #
        # A delayed notification payment will have an `unpaid` status, as
        # you're still waiting for funds to be transferred from the customer's
        # account.
        if p_session.payment_status == "paid":
            # Fulfill the purchase
            await utils.stripe_fulfill_order(p_session)

    elif event['type'] == 'checkout.session.async_payment_succeeded':

        # Fulfill the purchase
        utils.stripe_fulfill_order(session)

    elif event['type'] == 'checkout.session.async_payment_failed':

        # Send an email to the customer asking them to retry their order
        utils.stripe_email_customer(session, 'failed')


    # Passed signature verification
    return {'success': True}, 200
