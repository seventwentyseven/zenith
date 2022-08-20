import bcrypt
import datetime as dt
import hashlib
import os

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
    form = await request.form
    username = form.get('username', type=str)
    passwd_txt = form.get('password', type=str)
    captcha_data = form.get('h-captcha-response', type=str)
    il = app.state.web.invalid_logins
    user_ip = request.headers.get('CF-Connecting-IP')
    now = dt.datetime.utcnow()
    #TODO: Redirect to viewed page

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
                time_reaming: dt.timedelta = dt.timedelta(minutes=15) - (now - il[user_ip]['last_try'])
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
        "SELECT id, name, priv, pw_bcrypt FROM users "
        "WHERE name = :username",
        {'username': username}
    )
    if not user:
        await flash('Invalid username or password.', 'warning')
        return redirect(url_for('common.home'))
    else:
        user = dict(user)


    # Check if the password is correct
    print(pwd_valid := await validate_password(user['pw_bcrypt'], passwd_txt))
    if not pwd_valid:
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
        #* Login successful
        # Delete from invalid logins
        if user_ip in il:
            del il[user_ip]

        #* Login successful
        await make_session(user)
        await flash ('You are now logged in! Thank you for playing on 727 ❤️', 'success')
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
    #TODO: 2FA support, more info on trello
    return {'status': 'ok'}

@common.route('/leaderboard', methods=['GET'])
async def leaderboard():
    # Args
    mode = request.args.get('mode', type=int, default=None)
    page = request.args.get('page', type=int, default=1)
    country = request.args.get('country', type=str, default=None)
    _type = request.args.get('type', type=str, default='pp')
    return await render_template('/pages/common/leaderboard.html')