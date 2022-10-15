import bcrypt
import datetime as dt
import timeago
import hashlib
from quart import session
from app.constants.privileges import Privileges

import app.state
import app.settings


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

