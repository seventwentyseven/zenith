import bcrypt
import datetime as dt
import hashlib
import os

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
import app.settings

common = Blueprint('common', __name__)

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

@common.route('/leaderboard', methods=['GET'])
async def leaderboard():
    # Args
    mode = request.args.get('mode', type=int, default=None)
    page = request.args.get('page', type=int, default=1)
    country = request.args.get('country', type=str, default=None)
    _type = request.args.get('type', type=str, default='pp')
    return await render_template('/pages/common/leaderboard.html')