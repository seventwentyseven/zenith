import bcrypt
import datetime as dt
import hashlib
import json
import timeago
import stripe
from quart import session
from mailjet_rest import Client

import app.state
import app.settings
from app.constants.privileges import Privileges


async def make_session(user:dict) -> None:
    """Creates / Updates the session.\n
    Use only when target user is authenticated!"""
    session['authenticated'] = True
    session['user'] = user
    session['restricted'] = True if user['priv'] & 1 else False
    session.permanent = True

async def validate_password(pwd_db: str, pwd_str: str) -> bool:
    """Validates password."""

    # Hash password bcrypt
    pwd_bcrypt = pwd_db.encode()
    pwd_md5 = hashlib.md5(pwd_str.encode()).hexdigest().encode()

    # Delete unecryped passwords from memory
    del(pwd_str, pwd_db)

    # Slow on purpose, will chache to speed up
    if pwd_bcrypt in app.state.web.cache['bcrypt']:
        if pwd_md5 != app.state.web.cache['bcrypt'][pwd_bcrypt]:
            return False
        else:
            return True
    elif bcrypt.checkpw(pwd_md5, pwd_bcrypt):
        # Login successful Save pw_bcrypt to cache
        app.state.web.cache['bcrypt'][pwd_bcrypt] = pwd_md5
        return True
    else:
        return False

async def validate_captcha(data: str) -> bool:
    """Verify `data` with hcaptcha's API."""

    async with app.state.services.http_client.post(
        'https://hcaptcha.com/siteverify',
        data={'secret': app.settings.HCAPTCHA_SECRET, 'response': data}
    ) as resp:
        if not resp or resp.status != 200:
            return False

        res = await resp.json()

        return res['success']

def userViewPerms(priv: int, tpriv: int, pid: int, tid:int) -> bool:
    pass

async def stripe_create_order(p_session: stripe.checkout.Session) -> bool:
    now = int(dt.datetime.utcnow().timestamp())

    # Check if order already exists
    if await app.state.services.database.fetch_one(
        "SELECT * FROM orders WHERE gateway_identifier = :payment_id",
        {'payment_id': p_session.id}
    ):
        await app.state.services.database.execute(
            "UPDATE orders SET "
            "payment_status = :status, last_update = :last_update "
            "WHERE payment_id = :payment_id",
            {
                'status': p_session.payment_status,
                'last_update': now,
                'payment_id': p_session.payment_intent
            }
        )
    # Else, create order in database
    else:
        metadata = {
            'currency': p_session.currency,
            'buyer_email': p_session.customer_details['email'],
            'exact_payment_method': p_session.payment_method_types[0],
        }
        await app.state.services.database.execute(
            "INSERT INTO orders "
            "(gateway, gateway_identifier, payment_status, metadata, buyer_id, "
            "bought_for, total, months, created_at, last_update) "
            "VALUES ('stripe', :p_id, :p_status, :metadata, :buyer_id, "
            ":bought_for, :total, :months, :created_at, :last_update)",
            {
                'p_id': p_session.payment_intent,
                'p_status': p_session.payment_status,
                'metadata': json.dumps(metadata),
                'buyer_id': p_session.metadata['bought_by'],
                'bought_for': p_session.metadata['bought_for'],
                'total': p_session.amount_total,
                'months': p_session.metadata['months'],
                'created_at': now,
                'last_update': now,
            }
        )

    return True

async def stripe_fulfill_order(p_session: dict) -> bool:
    now = int(dt.datetime.utcnow().timestamp())
    # Check if order exists
    order = await app.state.services.database.fetch_one(
        "SELECT * FROM orders WHERE gateway_identifier = :payment_id",
        {'payment_id': p_session.id}
    )
    if not order:
        # There's no order but order is paid, log this into errorlog.txt
        with open('errorlog.txt', 'a') as f:
            f.write(f'[{dt.datetime.utcnow()}] No order found for payment {p_session.payment_intent} (stripe)')
        # Create order in database
        await stripe_create_order(p_session)

    # Check if traget user already has a supporter,
    # if yes, add months to it
    # if no, dt.datetime.utcnow() + dt.timedelta(days=30 * months)

    t = await app.state.services.database.fetch_one(
        "SELECT id, priv, donor_end FROM users WHERE id = :id",
        {'user_id': order['bought_for']}
    )

    if t['priv'] & Privileges.SUPPORTER and not t['donor_end'] < now:
        # Add months to current supporter
        await app.state.services.database.execute(
            "UPDATE users SET donor_end = donor_end + :months WHERE id = :id",
            {'months': order['months'], 'id': order['bought_for']}
        )
    else:
        # Create new supporter
        await app.state.services.database.execute(
            "UPDATE users SET priv = priv | :priv, donor_end = :end WHERE id = :id",
            {
                'priv': Privileges.SUPPORTER,
                'end': now + dt.timedelta(days=30 * order['months']),
                'id': order['bought_for']
            }
        )

    # Update order status
    await app.state.services.database.execute(
        "UPDATE orders SET payment_status = :status, last_update = :last_update "
        "WHERE payment_id = :payment_id",
        {
            'status': p_session.payment_status,
            'last_update': now,
            'payment_id': p_session.payment_intent
        }
    )


def stripe_email_customer(session):
    # TODO: fill me in
    # Three states, paid, unpaid, and failed
    if session.payment_status == 'paid':
        pass
    elif session.payment_status == 'unpaid':
        pass
    elif session.payment_status == 'failed':
        pass


