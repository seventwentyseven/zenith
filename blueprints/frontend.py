# -*- coding: utf-8 -*-

__all__ = ()

import bcrypt
import datetime
import hashlib
import os
from cmyui.logging import Ansi, log
from PIL import Image
from pathlib import Path
from markdown import markdown as md
from quart import (Blueprint, redirect, render_template, request, send_file, session)
from secrets import token_urlsafe

import app.state
from app.state import website as zglob
from app.constants.mods import Mods
from app.constants.privileges import Privileges
from app.objects.player import Player

from zenith import zconfig
from zenith.objects import regexes, utils
from zenith.objects.utils import flash, flash_tohome, validate_password, send_password_reset, invalid_login
from zenith.objects.constants import country2long
frontend = Blueprint('frontend', __name__)

@frontend.route('/')
async def home():
    if 'authenticated' in session:
        await utils.updateSession(session)

    return await render_template('home.html', methods=['GET'])

@frontend.route('/login', methods=['GET'])
async def login():
    if 'authenticated' in session:
        return await utils.flash_tohome('error', "You're already logged in!")
    return await render_template('login.html')

@frontend.route('/login', methods=['POST'])
async def login_post():
    if 'authenticated' in session:
        return await utils.flash_tohome('error', "You're already logged in!")


    form = await request.form
    username = form.get('username', type=str)
    passwd_txt = form.get('password', type=str)

    if username is None or passwd_txt is None:
        return await utils.flash_tohome('error', 'Invalid parameters.')

    # check if account exists
    user_info = await app.state.services.database.fetch_one(
        'SELECT id, name, email, priv, '
        'pw_bcrypt, silence_end '
        'FROM users '
        'WHERE safe_name = :sn',
        {"sn": utils.get_safe_name(username)}
    )
    # user doesn't exist; deny post
    if not user_info:
        return await render_template('login.html', flash={"msg":"Invalid username or password."})
    else:
        user_info = dict(user_info)

    # Bot isn't a user.
    if user_info['id'] == 1:
        return await render_template('login.html', flash={"msg":"Invalid username or password."})

    # cache and other related password information
    bcrypt_cache = zglob.cache['bcrypt']
    pw_bcrypt = user_info['pw_bcrypt'].encode()
    pw_md5 = hashlib.md5(passwd_txt.encode()).hexdigest().encode()
    del(passwd_txt)
    # check credentials (password) against db
    # intentionally slow, will cache to speed up
    if pw_bcrypt in bcrypt_cache:
        if pw_md5 != bcrypt_cache[pw_bcrypt]: # ~0.1ms
            await invalid_login(user_info['id'], request.headers.get('CF-Connecting-IP', type=str))
            return await render_template('login.html', flash={"msg":"Invalid username or password."})
    else: # ~200ms
        if not bcrypt.checkpw(pw_md5, pw_bcrypt):
            await invalid_login(user_info['id'], request.headers.get('CF-Connecting-IP', type=str))
            return await render_template('login.html', flash={"msg":"Invalid username or password."})

        # login successful; cache password for next login
        bcrypt_cache[pw_bcrypt] = pw_md5

    # user not verified; render verify
    if not user_info['priv'] & Privileges.VERIFIED:
        return await render_template('verify.html', userid=user_info['id'])


    # login successful; store session data

    session['authenticated'] = True
    session['user_data'] = {}
    #session['color'] = await app.state.services.database.fetch_val("SELECT color FROM customs WHERE userid=:id")
    await utils.updateSession(session, int(user_info['id']))

    # Insert login into database
    await app.state.services.database.execute(
        "INSERT INTO website_logins "
        "(userid, ip, action) "
        "VALUES (:userid, :ip, 'login') ",
        {"userid": user_info['id'], "ip": request.headers.get('CF-Connecting-IP', type=str)}
    )
    return await utils.flash_tohome('success', f"Welcome back {username}!")

@frontend.route('/logout', methods=['GET'])
async def logout():
    if 'authenticated' not in session:
        return await utils.flash_tohome('error', "You can't log out if you're not logged in.")

    # clear session data
    session.pop('authenticated', None)
    session.pop('user_data', None)

    # render login
    return await utils.flash_tohome('success', "Successfully logged out!")

@frontend.route('/register', methods=['GET'])
async def register():
    if 'authenticated' in session:
        return await utils.flash_tohome('error', "You're already logged in'!")

    return await render_template('register.html', message=None)                             #just comment when you want to disable registration
    # return await utils.flash_tohome('error', 'Registrations are currently disabled.')     #just uncomment when you want to disable registration


@frontend.route('/register', methods=['POST'])
async def register_post():
    #TODO: Insert into ingame login, can't do it now due to testing and I'm lazy
    if 'authenticated' in session:
        return await utils.flash_tohome('error', "You're already logged in.")

    if not zconfig.registration:
        return await utils.flash_tohome('error', 'Registrations are currently disabled.')

    form = await request.form

    username = form.get('username', type=str)
    email = form.get('email', type=str)
    pwd = form.get('password', type=str)
    pwdc = form.get('cpassword', type=str)
    #inviter = form.get('inviter', type=str)

    #* Verify if required parameters are present
    if username is None or email is None or pwd is None or pwdc is None:
        return await flash('error', 'Something is missing', 'home')

    #* Validate captcha
    if zconfig.hCaptcha_sitekey != 'changeme':
        captcha_data = form.get('h-captcha-response', type=str)
        if (
            captcha_data is None or
            not await utils.validate_captcha(captcha_data)
        ):
            return await flash('error', 'Captcha failed.', 'register')

    #* Verify username syntax
    # Username can contain lowercase letters, uppercase letters spaces and following characters []-_
    if not bool(regexes.username.match(username)):
        return await render_template('register.html', message="Invalid username syntax")
    elif len(username) > 15 or len(username) < 3:
        return await render_template('register.html', message="Username must be between 3 and 15 characters.")
    elif username.startswith(" ") or username.endswith(" "):
        return await render_template('register.html', message="Username cannot start or end with a space.")
    elif "_" in username and " " in username:
        return await render_template('register.html', message="Username cannot contain spaces and underscores at the same time.")
    elif username.lower() in zconfig.disallowed_names:
        return await render_template('register.html', message="That username is not allowed.")

    safe_name = utils.get_safe_name(username)

    # Check if username already in use
    if await app.state.services.database.fetch_val(
        "SELECT 1 FROM users WHERE safe_name = :sn OR name=:name",
        {"sn": safe_name, "name": username}
    ):
        return await render_template('register.html', message="Username already in use.")

    #* Verify email syntax
    if not bool(regexes.email.match(email)):
        return await render_template('register.html', message="Invalid email syntax.")
    # Check if email already in use
    elif await app.state.services.database.fetch_val(
        "SELECT 1 FROM users WHERE email = :email",
        {"email": email}
    ):
        return await render_template('register.html', message="Email already in use.")

    #* Verify password syntax
    password_valid = utils.checkPwdSyntax(pwd, pwdc)
    if password_valid['error'] == True:
        return await render_template('register.html', message=password_valid['message'])

    """
    #* Verify inviter code
    if inviter:
        #Fetch inviter name and code from customs
        inviter_info = await app.state.services.database.fetch_row(
            "SELECT userid, code FROM customs WHERE invite_code=:code",
            {"code": inviter}
        )
        if not inviter_info:
            pass
        else:
    """

    #* Get country
    if (
        request.headers and
        (ip := request.headers.get('CF-Connecting-IP', type=str)) is not None
    ):
        country = await utils.fetch_geoloc(ip)
        country = country.lower()
    else:
        country = 'xx'

    # Hash password
    pw_md5 = hashlib.md5(pwd.encode()).hexdigest().encode()
    pw_bcrypt = bcrypt.hashpw(pw_md5, bcrypt.gensalt())
    del(pwd, pwdc)
    #zglob.cache['bcrypt'][pw_bcrypt] = pw_md5 # cache pw
    #! Insert into users, and save assigned userid
    userid = await app.state.services.database.execute(
        "INSERT INTO users "
        "(name, safe_name, email, pw_bcrypt, country, creation_time, latest_activity) "
        "VALUES (:name, :safe_name, :email, :password, :country, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())",
        {
            "name": username,
            "safe_name": safe_name,
            "email": email,
            "password": pw_bcrypt,
            "country": country
        }
    )
    #! Insert into customs
    await app.state.services.database.execute(
        "INSERT INTO customs (userid) VALUES (:userid)",
        {"userid": userid}
    )
    #! Insert into stats mode (0-8, userid)
    for i in (0,1,2,3,4,5,6,8):
        await app.state.services.database.execute(
            "INSERT INTO stats (id, mode) VALUES (:id, :mode)",
            {"id": userid, "mode": i}
        )

    # Insert registration into log
    await app.state.services.database.execute(
        "INSERT INTO website_logins "
        "(userid, ip, action) "
        "VALUES (:userid, :ip, 'register') ",
        {"userid": userid, "ip": ip}
    )
    # user has successfully registered
    log(f"User <{username} ({userid})> has successfully registered through website.", Ansi.GREEN)
    return await render_template('verify.html', userid=userid)

@frontend.route('/leaderboard')
@frontend.route('/lb')
@frontend.route('/leaderboard/<mode>/<sort>/<mods>')
@frontend.route('/lb/<mode>/<sort>/<mods>')
async def leaderboard(mode='std', sort='pp', mods='vn'):
    return await render_template('leaderboard.html', mode=mode, sort=sort, mods=mods)

#!####################!#
#!     USER PAGE      !#
#!####################!#
@frontend.route('/u/<u>')
@frontend.route('/u/<u>/home')
@frontend.route('/u/<u>/<mode>')
@frontend.route('/u/<u>/<mode>/home')
async def profile(u:str=None, mode:int=None):
    #* User not specified
    if u == None:
        return await utils.flash_tohome('error', 'You must specify username or id')
    #* Update privs
    if 'authenticated' in session:
        await utils.updateSession(session)

    #* Get user
    u = await app.state.services.database.fetch_one(
        "SELECT id, name, priv, country, creation_time, "
        "latest_activity, preferred_mode, userpage_content, clan_id "
        "FROM users WHERE id=:u or name=:u",
        {"u": u}
    )
    if not u:
        return await utils.flash_tohome("error", "User not found") #switch to user specific 404
    u = dict(u)
    if u['id'] == 1:
        return flash_tohome('error', "Due to stuff getting absolute autism, viewing Ż Bot's profile is disabled.")
    #! Get author priv and check if target is restricted
    is_staff = 'authenticated' in session and session['user_data']['is_staff']
    if not (u['priv'] & Privileges.UNRESTRICTED or is_staff):
        return (await render_template('errors/404.html'), 404)

    u['customisation'] = utils.has_profile_customizations(u['id'])

    #* Check if mode, not specified. Set to user preferred (default: 0)
    if not mode:
        mode = u['preferred_mode']
    if int(mode) not in [0,1,2,3,4,5,6,8]:
        return await utils.flash_tohome("error", "Invalid mode") #switch to user specific 404

    #* Get stats
    s = await app.state.services.database.fetch_one(
        "SELECT * FROM stats WHERE id=:uid AND mode=:mode",
        {"uid": u['id'], "mode": mode}
    )
    s = dict(s)

    # If self, count votes
    if 'authenticated' in session and session['user_data']['id'] == u['id']:
        votes = {}
        votes['total'] = await app.state.services.database.fetch_val(
            "SELECT COUNT(*) FROM votes WHERE userid=:uid",
            {"uid": u['id']}
        )
        print(type(votes['total']), votes['total'])
        votes['total'] = votes['total']
        if votes['total'] >= 10:
            votes['reaming'] = 0
        else:
            votes['reaming'] = 10 - (votes['total'] % 10)
    else:
        votes = None

    #* Format stuff
    s['acc'] = round(s['acc'], 2)
    s['rscore'] = f"{s['rscore']:,}"
    s['tscore'] = f"{s['tscore']:,}"
    #TODO: Change to "since the beniginging" if userid < 100
    u['register_dt'] = datetime.datetime.fromtimestamp(float(u['creation_time']))
    u['latest_activity_dt'] = datetime.datetime.fromtimestamp(float(u['latest_activity']))
    s['playtime'] = datetime.timedelta(seconds=s['playtime'])
    u['clong'] = country2long[u['country'].upper()]

    # Convert markdown to html
    if u['userpage_content'] != None:
        u['userpage_content'] = md(u['userpage_content'])
        u['userpage_content'] = u['userpage_content'].replace("\n", "<br>")

    # Fetch user's customs
    customs = await app.state.services.database.fetch_one(
        "SELECT website, discord_tag, interests, location "
        "FROM customs WHERE userid=:uid",
        {"uid": u['id']}
    )

    # Everything done
    return await render_template('profile/home.html',
        user=u, mode=mode, stats=s, cur_page="home",
        customs=customs, votes=votes
    )


"""
@frontend.route('/u/<id>/<mode>/favorites')
async def profile_favorites(id:int, mode:int):
        #* User not specified
    if id == None:
        return await utils.flash_tohome('error', 'You must specify username or id')
    #* Update privs
    if 'authenticated' in session:
        await utils.updateSession(session)

    #* Get user
    u = await app.state.services.database.fetch_one(
        "SELECT id, name, priv, country, creation_time, "
        "latest_activity, preferred_mode "
        "FROM users WHERE id=:u or name=:u",
        {"u": id}
    )
    if not u:
        return await utils.flash_tohome("error", "User not found") #switch to user specific 404
    u = dict(u)
    if u['id'] == 1:
        return flash_tohome('error', "Due to stuff getting absolute autism, viewing Ż Bot's profile is disabled.")
    #! Get author priv and check if target is restricted
    is_staff = 'authenticated' in session and session['user_data']['is_staff']
    if not (u['priv'] & Privileges.NORMAL or is_staff):
        return (await render_template('errors/404.html'), 404)

    u['customisation'] = utils.has_profile_customizations(u['id'])

    #Fetch user's customs
    customs = await app.state.services.database.fetch_one(
        "SELECT website, discord_tag, interests, location "
        "FROM customs WHERE userid=:uid",
        {"uid": u['id']}
    )
    return await render_template('profile/favorites.html', user=u, cur_page='favorites', customs=customs, mode=mode)
"""

#! profile customization
BANNERS_PATH = Path.cwd() / 'zenith/.data/banners'
BACKGROUND_PATH = Path.cwd() / 'zenith/.data/backgrounds'
@frontend.route('/banners/<user_id>')
async def get_profile_banner(user_id: int):
    # Check if avatar exists
    for ext in ('jpg', 'jpeg', 'png', 'gif'):
        path = BANNERS_PATH / f'{user_id}.{ext}'
        if path.exists():
            return await send_file(path)

    return b'{"status":404}'


@frontend.route('/backgrounds/<user_id>')
async def get_profile_background(user_id: int):
    # Check if avatar exists
    for ext in ('jpg', 'jpeg', 'png', 'gif'):
        path = BACKGROUND_PATH / f'{user_id}.{ext}'
        if path.exists():
            return await send_file(path)

    return b'{"status":404}'

@frontend.route('/score/<id>')
async def score_page(id:int=None):
    #* Update privs
    if 'authenticated' in session:
        await utils.updateSession(session)

    # Get user and check priv
    s = await app.state.services.database.fetch_one(
        "SELECT id, map_md5, score, pp, acc, max_combo, "
        "mods, n300, n100, n50, nmiss, ngeki, nkatu, "
        "grade, status, mode,  userid, play_time, "
        "pauses, online_checksum "
        "FROM scores WHERE id=:id",
        {"id": id}
    )
    if not s:
        return await flash_tohome('error', "Score not found.")
    s = dict(s)
    u = await app.state.services.database.fetch_one(
        "SELECT id, name, priv FROM users WHERE id=:id",
        {"id": s['userid']}
    )
    if not u:
        return await flash_tohome('error', "Database error, user not found, report this to developers.")
    u = dict(u)
    if not u['priv'] & 1:
       if ('authenticated' not in session and not session['user_data']['is_staff']
           and u['id'] != session['user_data']['id']):
           return await flash_tohome('error', "Score not found.")

    m = await app.state.services.database.fetch_one(
        "SELECT id, set_id, artist, title, version, creator, diff "
        "FROM maps WHERE md5=:md5",
        {"md5": s['map_md5']}
    )
    if not m:
        return await flash_tohome('error', "Database error, map not found, report this to developers.")
    m = dict(m)

    #* Format stuff
    s['score'] = f"{s['score']:,}"
    s['pp'] = round(s['pp'], 2)
    s['acc'] = round(s['acc'], 2)
    m['diff'] = round(m['diff'], 2)
    m['diff_color'] = utils.getDiffColor(m['diff'])
    if s['mods'] != 0:
        s['mods'] = f"+{Mods(s['mods'])!r}"
        if "DT" in s['mods'] and "NC" in s['mods']:
            s['mods'] = s['mods'].replace("DT", "")
    else:
         s['mods'] = "No Mods"

    if s['pauses'] == None:
        s['pauses'] = "?"
    return await render_template('score.html', user=u, map=m, score=s)

#! Settings
@frontend.route('/settings')
async def default_settings_redirect():
    return redirect('/settings/profile')

@frontend.route('/settings/profile')
async def settings_profile():
    #* Update privs
    if 'authenticated' in session:
        await utils.updateSession(session)
    else:
        return await flash_tohome("error", "You must be logged in to enter this page.")
    return await render_template('/settings/profile.html')

@frontend.route('/settings/profile/change_email', methods=['POST', 'GET'])
async def settings_profile_change_email():
    if 'authenticated' in session:
        await utils.updateSession(session)
    else:
        return await flash_tohome("error", "You must be logged in to enter this page.")

    # Get code from form
    form = await request.form
    new_email = form.get('new_email', type=str)
    passwd_txt = form.get('new_email-password', type=str)


    # Check password
    if not await validate_password(session['user_data']['id'], passwd_txt):
        return await flash('error', 'Invalid password, email unchanged.', 'settings/profile')

    # Check email
    old_email = await app.state.services.database.fetch_val(
        "SELECT email FROM users WHERE id=:uid",
        {"uid": session['user_data']['id']}
    )
    if new_email == old_email:
        return await flash('error', 'New email must be diffrent from previous one', 'settings/profile')

    email_used = await app.state.services.database.fetch_val('SELECT 1 FROM users WHERE email=:email', {'email': new_email})
    if email_used:
        return await flash('error', 'Email already in use', 'settings/profile')
    if not regexes.email.match(new_email):
        return await flash('error', 'Invalid email syntax.', 'settings/profile')

    await app.state.services.database.execute(
        "UPDATE users SET email=:new_email WHERE id=:uid",
        {"new_email": new_email, "uid": session['user_data']['id']}
    )
    redirect('/settings/profile')
    return await flash('success', 'Email changed successfully', 'settings/profile')

@frontend.route('/settings/profile/change_password', methods=['POST', 'GET'])
async def settings_profile_change_password():
    #* Update privs
    if 'authenticated' in session:
        await utils.updateSession(session)
    else:
        return await flash_tohome("error", "You must be logged in to enter this page.")
    form = await request.form
    old_pwd = form.get('old_password', type=str)
    pwd = form.get('new_password', type=str)
    pwdc = form.get('new_password_confirm', type=str)

    # Validate old password
    if not await validate_password(session['user_data']['id'], old_pwd):
        return await flash('error', 'Invalid password, password unchanged.', 'settings/profile')

    #* Verify password syntax
    pwd_valid = utils.checkPwdSyntax(pwd, pwdc)
    if pwd_valid['error'] == True:
        return await flash('error', pwd_valid['message'], 'settings/profile')

    # Update password.
    pw_md5 = hashlib.md5(pwd.encode()).hexdigest().encode()
    pw_bcrypt = bcrypt.hashpw(pw_md5, bcrypt.gensalt())
    del(pwd, pwdc)
    #bcrypt_cache = zglob.cache['bcrypt']
    #bcrypt_cache[pw_bcrypt] = pw_md5 # cache pw
    await app.state.services.database.execute(
        "UPDATE users SET pw_bcrypt=:pw WHERE id=:uid",
        {'pw': pw_bcrypt, 'uid': session['user_data']['id']}
    )

    # Log user out
    session.pop('authenticated', None)
    session.pop('user_data', None)

    return await flash_tohome('success', 'Password changed, please login again.')

@frontend.route('/settings/customization')
async def settings_customizations():
    #* Update privs
    if 'authenticated' in session:
        await utils.updateSession(session)
    else:
        return await flash_tohome("error", "You must be logged in to enter this page.")
    return await render_template('settings/customization.html')

@frontend.route('/settings/customization/avatar', methods=['POST'])
async def settings_avatar_post():
    #* Update privs
    if 'authenticated' in session:
        await utils.updateSession(session)
    else:
        return await flash_tohome("error", "You must be logged in to enter this page.")
    # constants

    #if Privileges.BLOCK_AVATAR in Privileges(int(session['user_data']['id'])):
    #    return flash('errors', "You don't have privileges to change your avatar", 'settings/customization')
    AVATARS_PATH = f'{zconfig.path_to_gulag}.data/avatars'
    ALLOWED_EXTENSIONS = ['.jpeg', '.jpg', '.png']

    avatar = (await request.files).get('avatar')
    # no file uploaded; deny post
    if avatar is None or not avatar.filename:
        return await flash('error', 'No image was selected!', 'settings/customization')

    filename, file_extension = os.path.splitext(avatar.filename.lower())

    # bad file extension; deny post
    if not file_extension in ALLOWED_EXTENSIONS:
        return await flash('error', 'The image you select must be either a .JPG, .JPEG, or .PNG file!', 'settings/customization')

    # remove old avatars
    for fx in ALLOWED_EXTENSIONS:
        if os.path.isfile(f'{AVATARS_PATH}/{session["user_data"]["id"]}{fx}'): # Checking file e
            os.remove(f'{AVATARS_PATH}/{session["user_data"]["id"]}{fx}')

    # avatar cropping to 1:1
    pilavatar = Image.open(avatar.stream)

    # avatar change success
    pilavatar = utils.crop_image(pilavatar)
    pilavatar.save(os.path.join(AVATARS_PATH, f'{session["user_data"]["id"]}{file_extension.lower()}'))
    return await flash('success', 'Your avatar has been successfully changed!', 'settings/customization')

@frontend.route('/settings/customization/banner_bg', methods=['POST'])
async def settings_custom_post():

    #* Update privs
    if 'authenticated' in session:
        await utils.updateSession(session)
    else:
        return await flash_tohome("error", "You must be logged in to enter this page.")

    usr_prv = Privileges(int(session['user_data']['priv']))
    if (Privileges.SUPPORTER not in usr_prv
        and Privileges.PREMIUM not in usr_prv
        and not session['user_data']['is_staff']):
        return await flash('error', f'This is supporter only feature!', 'settings/customization')

    files = await request.files
    banner = files.get('banner')
    background = files.get('background')
    ALLOWED_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.gif']
    # no file uploaded; deny post
    if banner is None and background is None:
        return await flash('error', 'No image was selected!', 'settings/customization')

    if banner is not None and banner.filename:
        _, file_extension = os.path.splitext(banner.filename.lower())
        if not file_extension in ALLOWED_EXTENSIONS:
            return await flash('error', f'The banner you select must be either a .JPG, .JPEG, .PNG or .GIF file!', 'settings/customization')

        banner_file_no_ext = os.path.join(f'zenith/.data/banners', f'{session["user_data"]["id"]}')

        # remove old picture
        for ext in ALLOWED_EXTENSIONS:
            banner_file_with_ext = f'{banner_file_no_ext}{ext}'
            if os.path.isfile(banner_file_with_ext):
                os.remove(banner_file_with_ext)

        await banner.save(f'{banner_file_no_ext}{file_extension}')

    if background is not None and background.filename:
        _, file_extension = os.path.splitext(background.filename.lower())
        if not file_extension in ALLOWED_EXTENSIONS:
            return await flash('error', f'The background you select must be either a .JPG, .JPEG, .PNG or .GIF file!', 'settings/custom')

        background_file_no_ext = os.path.join(f'zenith/.data/backgrounds', f'{session["user_data"]["id"]}')

        # remove old picture
        for ext in ALLOWED_EXTENSIONS:
            background_file_with_ext = f'{background_file_no_ext}{ext}'
            if os.path.isfile(background_file_with_ext):
                os.remove(background_file_with_ext)

        await background.save(f'{background_file_no_ext}{file_extension}')

    return await flash('success', 'Your customisation has been successfully changed!', 'settings/customization')

@frontend.route('/settings/about_me', methods=["GET"])
async def settings_about_me():
    #* Update privs
    if 'authenticated' in session:
        await utils.updateSession(session)
    else:
        return await flash_tohome("error", "You must be logged in to enter this page.")

    cur_abtme = await app.state.services.database.fetch_val(
        "SELECT userpage_content FROM users WHERE id=:uid",
        {"uid": session['user_data']['id']}
    )
    if not cur_abtme:
        cur_abtme = ""
    if Privileges.BLOCK_ABOUT_ME in Privileges(int(session['user_data']['priv'])):
        return await flash_tohome('error', "You are banned from changing your about me, for more info contact staff.")

    return await render_template('settings/about_me.html', cur_abtme=cur_abtme)

#! Dedicated docs
@frontend.route('/docs/privacy_policy')
async def privacy_policy():
    return await render_template('privacy_policy.html')

@frontend.route('/docs/rules')
async def rules():
    return await render_template('rules.html')

#! Redirects
@frontend.route('/discord')
async def redirect_discord():
    return redirect(zconfig.discord_server)

@frontend.route('/beatmaps')
async def bmap_search():
    # Priv update
    if 'authenticated' in session:
        await utils.updateSession(session)

    return await render_template('beatmaps.html')

@frontend.route('/s/<set_id>')
async def beatmap_set_redirect(set_id:int=None):
    """Redirect to beatmap set page"""
    # Priv update
    if 'authenticated' in session:
        await utils.updateSession(session)

    # Validate set_id
    if set_id == None:
        return flash_tohome('error', 'Invalid beatmap set ID!')

    # Fetch map from set
    map_id = await app.state.services.database.fetch_val(
        'SELECT id FROM maps WHERE set_id=:set_id',
        {'set_id': set_id}
    )
    if map_id == None:
        return await render_template('errors/404.html')
    else:
        return redirect(f'/b/{map_id}')


@frontend.route('/beatmaps/<map_id>')
async def redirectMap(map_id='map_id'):
    return redirect(f'/b/{map_id}')

@frontend.route('/b/<map_id>')
async def beatmap_page(map_id:int=None):
    """Redirect to beatmap page"""
    # Priv update
    if 'authenticated' in session:
        await utils.updateSession(session)

    # Validate map_id
    if map_id == None:
        return await render_template('errors/404.html')

    # Get set_id
    set_id = await app.state.services.database.fetch_val(
        'SELECT set_id FROM maps WHERE id=:map_id',
        {'map_id': map_id}
    )
    if not set_id:
        return await render_template('errors/404.html')
    else:
        # Get map info from db
        m = await app.state.services.database.fetch_one(
            'SELECT m.set_id, m.status, m.artist, m.title, m.creator, COUNT(f.userid) AS `favs` '
            'FROM maps m LEFT JOIN favourites f ON f.setid=m.set_id '
            'WHERE m.set_id=:set_id',
            {"set_id": set_id}
        )
        m = dict(m)


    return await render_template('bmap_page.html', m=m, set_id=set_id, map_id=map_id)

@frontend.route('/forgot-password', methods=['GET'])
async def forgot_password():
    if 'authenticated' in session:
        utils.updateSession(session)
        return await flash_tohome('error', 'You are already logged in!')

    return await render_template('forgot_password.html', type=0)

@frontend.route('/forgot-password', methods=['POST'])
async def forgot_password_post():
    if 'authenticated' in session:
        utils.updateSession(session)
        return await flash_tohome('error', 'You are already logged in!')

    # Get form
    form = await request.form
    email = form.get('email', type=str)

    if email == None:
        return await render_template('forgot_password.html',
            after_post=0, message='Please enter your email address!')

    user = await app.state.services.database.fetch_one(
        "SELECT id, name, email FROM users WHERE email=:email",
        {"email": email}
    )
    if not user:
        return await render_template('forgot_password.html',
            type=0, message='No user with that email address exists!')
    else:
        user = dict(user)

    token = token_urlsafe(32)
    await app.state.services.database.execute(
        "INSERT INTO email_confirms "
        "(userid, token, type, exp_date) "
        "VALUES (:userid, :token, 'pwd_reset', :exp_date)",
        {
            "userid": user['id'],
            "token": token,
            "exp_date": (datetime.datetime.now() + datetime.timedelta(minutes=30)).strftime("%Y-%m-%d %H:%M:%S")
        }
    )
    send_password_reset(user['email'], user['name'], token)
    return await render_template('forgot_password.html', type=1)

@frontend.route('/forgot-password/<token>', methods=['GET'])
async def forgot_password_token(token:str=None):
    if 'authenticated' in session:
        utils.updateSession(session)
        return await flash_tohome('error', 'You are already logged in!')

    if token == None:
        return await flash_tohome('error', 'Invalid or expired token!')

    user = await app.state.services.database.fetch_val(
        "SELECT 1 FROM email_confirms "
        "WHERE token=:token AND exp_date > NOW() AND type='pwd_reset'",
        {"token": token}
    )
    if not user:
        return await flash_tohome('error', 'Invalid or expired token!')

    return await render_template('forgot_password.html',
        type=2, token=token)

@frontend.route('/forgot-password/<token>', methods=['POST'])
async def forgot_password_token_post(token:str=None):
    if 'authenticated' in session:
        utils.updateSession(session)
        return await flash_tohome('error', 'You are already logged in!')

    if token == None:
        return await flash_tohome('error', 'Invalid or expired token!')

    user = await app.state.services.database.fetch_val(
        "SELECT userid FROM email_confirms "
        "WHERE token=:token AND exp_date > NOW() AND type='pwd_reset'",
        {"token": token}
    )
    if not user:
        return await flash_tohome('error', 'Invalid or expired token!')

    form = await request.form
    pwd = form.get('password', type=str)
    pwdc = form.get('cpassword', type=str)

    pwd_valid = utils.checkPwdSyntax(pwd, pwdc)
    if pwd_valid['error'] == True:
        return await render_template('forgot_password.html', type=2, token=token, message=pwd_valid['message'])

    # Hash password
    pw_md5 = hashlib.md5(pwd.encode()).hexdigest().encode()
    pw_bcrypt = bcrypt.hashpw(pw_md5, bcrypt.gensalt())
    del(pwd, pwdc)

    # Update password
    await app.state.services.database.execute(
        "UPDATE users SET pw_bcrypt=:pw WHERE id=:userid",
        {"pw": pw_bcrypt, "userid": user}
    )
    await app.state.services.database.execute(
        "DELETE FROM email_confirms WHERE token=:token",
        {"token": token}
    )

    return await flash_tohome('success', 'Password updated successfully! Login with new password!')

@frontend.route('/relationships')
async def relationships(type:str=None):
    if not 'authenticated' in session:
        return await flash_tohome('error', 'You must be logged in to access this page.')

    uprv = session['user_data']['priv']
    if uprv & 16 or uprv & 32 or uprv >= 2048:
        is_supporter = True
    else:
        is_supporter = False

    return await render_template('relationships.html', supporer=is_supporter)

@frontend.route('/discord_callback')
async def discord_callback():
    # Logged in?
    if not 'authenticated' in session:
        return await flash_tohome('error', 'You must be logged in to access this page.')

    code = request.args.get('code', type=str, default=None)
    # Askdickord.com
    if code == None:
        return await flash_tohome('error', 'Invalid callback code!')

    post_data = {
        'client_id': zconfig.CLIENT_ID,
        'client_secret': zconfig.CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': f'https://{zconfig.domain}/discord_callback'
    }
    # Make post request to discord
    async with app.state.services.http.post(
        'https://discordapp.com/api/oauth2/token',
        data=post_data,
        headers={'Content-Type': 'application/x-www-form-urlencoded'}
    ) as r:
        # Get response
        r1 = await r.json()
        # If error occured
        if 'error' in r1:
            log(f"Error occured on discord callback: {r1['error']}", Ansi.RED)
            return await flash_tohome('error', f"Invalid request!\nError:  {r1['error']} Message: {r1['error_description']}")

        # Else assign token to r1 and make get request to get user ID
        at = r1['access_token']
        async with app.state.services.http.get(
            'https://discordapp.com/api/users/@me',
            headers={'Authorization': f'Bearer {at}'}
        ) as r2:
            # If error occured
            if r2.status != 200:
                log(f"Error occured on discord callback: {r2}", Ansi.RED)
                return await flash_tohome('error', f'Request error! Result from API: {r2}!')
            r2 = await r2.json()

            # Replace to customs
            await app.state.services.database.execute(
                "UPDATE users SET discord_id=:did WHERE id=:uid",
                {"did": r2['id'], "uid": session['user_data']['id']}
            )

    # Delete potentialy sensitive data
    del(r1, r2, at, code, post_data)

    return await flash_tohome('success', 'Discord callback success!')