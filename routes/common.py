import bcrypt
import datetime as dt
import hashlib
from zenith.utils import make_session

from quart import Blueprint
from quart import redirect
from quart import render_template
from quart import request
from quart import send_file
from quart import session
from quart import flash
from quart import url_for
from quart import get_flashed_messages

import app.state
import zenith.config

common = Blueprint('common', __name__)

@common.route('/', methods=['GET'])
async def home():
    if 'authenticated' in session:
        return await render_template('/pages/common/home.html')
    else:
        return await render_template('/pages/common/home_guest.html')

@common.route('/team', methods=['GET'])
async def team():
    return await render_template('/pages/common/team.html')

@common.route('/login', methods=['POST'])
async def login():
    # Login is by login modal, get the form data and check if it's valid
    if 'authenticated' in session:
        await flash('You are already logged in.', 'warning')
        return redirect(url_for('common.home'))

    form = await request.form
    username = form.get('username', type=str)
    passwd_txt = form.get('password', type=str)

    if not username or not passwd_txt:
        await flash('Please enter a username and password.', 'warning')
        return redirect(url_for('common.home'))

    # Check if the user exists
    user = await app.state.services.database.fetch_one(
        "SELECT id, name, priv, pw_bcrypt FROM users WHERE name = :username",
        {'username': username})
    if not user:
        await flash('Invalid username or password.', 'warning')
        return redirect(url_for('common.home'))
    else:
        user = dict(user)

    # Hash password ~200ms
    pw_bcrypt = user['pw_bcrypt'].encode()
    pw_md5 = hashlib.md5(passwd_txt.encode()).hexdigest().encode()
    # Delete unecryped password from memory
    del(passwd_txt)

    # Slow on purpose, will chache to speed up
    if pw_bcrypt in app.state.web.cache['bcrypt']:
        if pw_md5 != app.state.web.cache['bcrypt'][pw_bcrypt]: # ~0.1ms
            await flash('Invalid username or password.', 'warning')
            return redirect(url_for('common.home'))
    else: # ~200ms
        if not bcrypt.checkpw(pw_md5, pw_bcrypt):
            await flash('Invalid username or password.', 'warning')
            return redirect(url_for('common.home'))

        # Login successful Save pw_bcrypt to cache
        app.state.web.cache['bcrypt'][pw_bcrypt] = pw_md5

    #* Login successful
    await make_session(user)

    await flash ('You are now logged in! Thank you for playing on 727 ❤️', 'success')
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