import datetime as dt
import timeago

from quart import session

import app.state.services


async def make_session(user:dict) -> None:
    """Creates / Updates the session.\n
    Use only when target user is authenticated!"""
    session['authenticated'] = True
    session['userid'] = user['id']
    session['username'] = user['name']
    if int(user['priv']) & 1:
        session['restricted'] = False
    else:
        session['restricted'] = True
