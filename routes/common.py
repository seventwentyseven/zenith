from typing import Type
import bcrypt
import datetime as dt
import hashlib
import os
import stripe
from pathlib import Path

from quart import Blueprint
from quart import redirect
from quart import render_template
from quart import request
from quart import send_file
from quart import session
from quart import flash
from quart import url_for
from quart import get_flashed_messages

from zenith.utils import make_session
from zenith.utils import validate_password, validate_captcha

import app.state
import app.settings
from app.constants.mods import Mods
from app.constants.gamemodes import GameMode

common = Blueprint('common', __name__)

BANNERS_PATH = Path.cwd() / '.data/banners'


@common.route('/', methods=['GET'])
async def home():
    data = await app.state.services.database.fetch_one(
        "SELECT (SELECT COUNT(*) FROM users) AS users, "
        "(SELECT COUNT(*) FROM scores) AS scores, "
        "(SELECT COUNT(*) FROM maps WHERE (status=2 OR status=5) AND frozen=1) AS maps "
    )
    data = dict(data)
    if 'authenticated' in session:
        data['online'] = len(app.state.sessions.players.unrestricted)-1
        data['last_user'] = dict(await app.state.services.database.fetch_one(
            "SELECT id, name, creation_time "
            "FROM users WHERE priv & 1 "
            "ORDER BY id DESC LIMIT 1"
        ))
        return await render_template('/pages/common/home.html', data=data)
    else:
        return await render_template('/pages/common/home_guest.html', data=data)


@common.route('/team', methods=['GET'])
async def team():
    return await render_template('/pages/common/team.html')


@common.route('/docs', methods=['GET'])
async def docs():
    data = []
    for file in os.listdir('zenith/templates/pages/docs'):
        if file.endswith('.html'):
            if file.startswith('index'):
                continue
            data.append(file[:-5])

    return await render_template('/pages/docs/index.html', data=data)


@common.route('/docs/<name>', methods=['GET'])
async def docs_page(name):
    content = open("zenith/templates/pages/docs/{}.html".format(name)).read()
    return content


@common.route('/login', methods=['POST'])
async def login():
    form = await request.form
    username = form.get('username', type=str)
    passwd_txt = form.get('password', type=str)
    captcha_data = form.get('h-captcha-response', type=str)
    il = app.state.web.invalid_logins
    user_ip = request.headers.get('CF-Connecting-IP')
    now = dt.datetime.utcnow()
    # TODO: Redirect to viewed page

    # First, check if user is already logged in
    if 'authenticated' in session:
        await flash('You are already logged in.', 'warning')
        return redirect(url_for('common.home'))

    if captcha_data is None or not await validate_captcha(captcha_data):
        await flash('Captcha failed or left unsolved, please try again.', 'warning')
        return redirect(url_for('common.home'))

    # Check if user has tried to login too many times
    # and if last try was less than 15 minutes ago
    if user_ip in il:
        if il[user_ip]['count'] >= 3:
            if now - il[user_ip]['last_try'] < dt.timedelta(minutes=15):
                # Create time reaming var, return str `{x} minutes, {x} seconds`
                time_reaming: dt.timedelta = dt.timedelta(
                    minutes=15) - (now - il[user_ip]['last_try'])
                await flash(
                    f'You have tried to login too many times. Please wait {time_reaming.seconds // 60} minutes.',
                    'error'
                )
                return redirect(url_for('common.home'))

    if not username or not passwd_txt:
        await flash('Please enter a username and password.', 'warning')
        return redirect(url_for('common.home'))

    # Get user's encrypted password and check if user exists
    user = await app.state.services.database.fetch_one(
        "SELECT id, name, priv, pw_bcrypt, preferred_mode, clan_id "
        "FROM users "
        "WHERE name = :username",
        {'username': username}
    )
    if not user:
        await flash('Invalid username or password.', 'warning')
        return redirect(url_for('common.home'))
    else:
        user = dict(user)

    # Check if the password is correct
    if not await validate_password(user['pw_bcrypt'], passwd_txt):
        # add ip into il, if doesn't exist create it
        if user_ip not in il:
            il[user_ip] = {'count': 1, 'last_try': now}
            await flash("Invalid username or password.", 'warning')
        else:
            il[user_ip] = {'count': il[user_ip]['count']+1, 'last_try': now}

            if il[user_ip]['count'] >= 3:
                await flash('Too many attempts. Please wait 15 minutes.', 'error')
            elif il[user_ip]['count'] == 1:
                await flash('Invalid username or password. You have 2 more tries before being locked out for 15 minutes.', 'warning')
            elif il[user_ip]['count'] == 2:
                await flash('Invalid username or password. You have 1 more try before being locked out for 15 minutes.', 'warning')

        return redirect(url_for('common.home'))
    else:
        # * Login successful
        # Delete from invalid logins
        if user_ip in il:
            del il[user_ip]
        del user['pw_bcrypt']

        # * Login successful
        await make_session(user)
        await flash('You are now logged in! Thank you for playing on 727 ❤️', 'success')
        await app.state.services.database.execute(
            "INSERT INTO website_logins (userid, ip, browser) "
            "VALUES (:userid, :ip, :browser)",
            {'userid': user['id'], 'ip': user_ip,
                'browser': request.headers.get('User-Agent')}
        )
        print("Total time: ", dt.datetime.utcnow() - now)
        return redirect(url_for('common.home'))


@common.route('/logout', methods=['GET'])
async def logout():
    if 'authenticated' in session:
        # Delete all elements from session
        session.clear()
        await flash('You have been logged out.', 'success')
    else:
        await flash('You are not logged in.', 'warning')
    return redirect(url_for('common.home'))


@common.route('/test')
async def test():
    print(session)
    return 'Logs'


@common.route('/login/2fa', methods=['GET', 'POST'])
async def login_2fa():
    # TODO: 2FA support, more info on trello
    return {'status': 'ok'}

#! grafika dzifors code


# @common.route('/scores/<scoreid>', methods=['GET'])
# async def scores(scoreid):
#     data = await app.state.services.database.fetch_one(
#         "SELECT * "
#         "FROM scores "
#         "WHERE id = :id",
#         {'id': scoreid}
#     )
#     if not data:
#         await flash('Score not found!', 'error')
#     else:
#         data = dict(data)
#     return await render_template('/pages/common/scores.html', scoreid=scoreid)

@common.route('/score/<id>')
async def scores(id: int = None):
    # Get user and check priv
    s = await app.state.services.database.fetch_one(
        "SELECT id, map_md5, score, pp, acc, max_combo, mods, n300, n100, n50, "
        "nmiss, ngeki, nkatu, grade, status, mode,  userid, play_time, online_checksum "
        "FROM scores WHERE id=:id",
        {"id": id}
    )
    if not s:
        return await render_template('/pages/common/scores.html', scoreid=id, error="Score not found!")
    s = dict(s)
    u = await app.state.services.database.fetch_one(
        "SELECT id, name, priv FROM users WHERE id=:id",
        {"id": s['userid']}
    )
    if not u:
        return await render_template('/pages/common/scores.html', scoreid=id, error="Database error, user not found, report this to developers.")
    u = dict(u)
    if not u['priv'] & 1:
        if ('authenticated' not in session and not session['user_data']['is_staff']
                and u['id'] != session['user_data']['id']):
            return await render_template('/pages/common/scores.html', scoreid=id, error="Score not found!")

    m = await app.state.services.database.fetch_one(
        "SELECT id, set_id, artist, title, version, creator, diff "
        "FROM maps WHERE md5=:md5",
        {"md5": s['map_md5']}
    )
    if not m:
        return await render_template('/pages/common/scores.html', scoreid=id, error="Database error, map not found, report this to developers.")
    m = dict(m)

    # * Format stuff
    s['score'] = f"{s['score']:,}"
    s['pp'] = round(s['pp'], 2)
    s['acc'] = round(s['acc'], 2)
    s['mode'] = GameMode.as_text(s['mode'], s['mods'])
    m['diff'] = round(m['diff'], 2)
    m['diff_color'] = '#FF00FF'   # utils.getDiffColor(m['diff'])
    if s['mods'] != 0:
        s['mods'] = f"+{Mods(s['mods'])!r}"
        if "DT" in s['mods'] and "NC" in s['mods']:
            s['mods'] = s['mods'].replace("DT", "")
    else:
        s['mods'] = "No Mods"

    return await render_template('/pages/common/scores.html', user=u, map=m, score=s)


@common.route('/leaderboard', methods=['GET'])
async def leaderboard():
    # Render leaderboard page, all logic is done in JS and API
    # Determine user's default mode
    defmode = 0
    if 'authenticated' in session:
        defmode = session['user']['preferred_mode']

    return await render_template('/pages/common/leaderboard.html', defmode=defmode)


@common.route('/testcolors', methods=['GET'])
async def testcolors():
    return await render_template('/pages/common/testcolors.html')


@common.route('/donate', methods=['GET'])
async def donate():
    if 'authenticated' not in session:
        await flash('You must be logged in to access this page!', 'error')
        return redirect(url_for('common.home'))
    return await render_template('/pages/common/donate.html')


@common.route('/donate/checkout', methods=['POST'])
async def donate_checkout():
    if 'authenticated' not in session:
        await flash('You must be logged in to access this page!', 'error')
        return redirect(url_for('common.home'))
    # Get form data and print it
    data = await request.form
    username = data.get('username', type=str)
    months = data.get('months', type=int)
    payment_method = data.get('payment_method', type=str)

    if not username or username == '':
        username = session['user']['name']
    if not months or months < 1 or months > 24:
        await flash('Missing data, please fill out form again!', 'error')
        return redirect(url_for('common.donate'))
    if not payment_method or payment_method not in ('paypal', 'stripe'):
        await flash('Missing data, please fill out form again!', 'error')
        return redirect(url_for('common.donate'))

    # Check if user exists
    if username == '':
        username = session['user']['name']
    user = await app.state.services.database.fetch_one(
        "SELECT id, name, country FROM users WHERE name = :username",
        {'username': username}
    )
    if not user:
        await flash('User not found!', 'error')
        return redirect(url_for('common.donate'))
    user = dict(user)

    # Calculate price and discount
    SUPPORTER_PRICE = 3.00
    DISCOUNT = 3.00  # Percent per month
    if months < 4:
        d = 0
    elif months > 12:
        d = 42
    else:
        d = months*DISCOUNT

    total = SUPPORTER_PRICE*(months - (months * (d/100)))
    total_d = "{:.2f}".format(total)  # Add decimal zeroes if needed

    if payment_method == 'paypal':
        pass
    else:
        stripe.api_key = 'sk_test_51LnJv1EUCKjdFhXKGsjNwfLBIEd9kS5rKLaazxjKXLkEUQjrovtHh1ZdYkePFeDc50J0mQV1bEwMwIGRET7FVHmi00rvA4e22R'
        app.settings.DOMAIN
        # Create payment intent and then create checkout session using it
        checkout_session = stripe.checkout.Session.create(
            # Create custom product
            currency='usd',
            mode='payment',
            success_url=f'https://{app.settings.DOMAIN}/donate/checkout/success',
            cancel_url=f'https://{app.settings.DOMAIN}/donate/checkout/cancel',
            automatic_tax={'enabled': True},
            # In line_items, create new product, with cost of total USD
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': f'Supporter Tag',
                            'description': f'Supporter Tag for {months} {"month" if months == 1 else "months"} for {user["name"]}',
                        },
                        'unit_amount': int(total*100),
                        'tax_behavior': 'exclusive',
                    },
                    'quantity': 1,
                },
            ],
            metadata={
                'bought_for': user['id'],
                'bought_by': session['user']['id'],
                'months': months,
            },
            payment_intent_data={
                "metadata": {
                    'bought_for': user['id'],
                    'bought_by': session['user']['id'],
                    'months': months,
                }
            },
        )

    return redirect(checkout_session.url, code=303)


@common.route('/banners/<uid>')
async def get_banner(uid: int):
    # Check if file exists
    for ext in ('png', 'jpg', 'jpeg', 'gif'):
        if os.path.exists(BANNERS_PATH / f'{uid}.{ext}'):
            return await send_file(f'{BANNERS_PATH}/{uid}.{ext}')
    else:
        return {'success': False, 'message': 'This user does not have a banner.'}
