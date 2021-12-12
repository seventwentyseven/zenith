# -*- coding: utf-8 -*-

__all__ = ()

import bcrypt
import hashlib
import os
import time
import datetime
from pandas import to_datetime

from cmyui.logging import Ansi
from cmyui.logging import log
from cmyui.osu import Mods
from functools import wraps
from PIL import Image
from pathlib import Path
from pandas import to_datetime
from quart import Blueprint
from quart import redirect
from quart import render_template
from quart import request
from quart import session
from quart import send_file

from objects import glob
from objects import utils
from objects.utils import flash, getDiffColor, time_ago
from objects.privileges import Privileges

from const import constants as const
from const import countries



frontend = Blueprint('frontend', __name__)
@frontend.route('/static/images/assets/<imgname>')
async def get_image(imgname:str):
    # Check if avatar exists
    path = '.data/images/' f'{imgname}'
    return await send_file(path)

    return b'{"status":404}'
# profile customisation
BANNERS_PATH = Path.cwd() / '.data/banners'
BACKGROUND_PATH = Path.cwd() / '.data/backgrounds'
@frontend.route('/banners/<user_id>')
async def get_profile_banner(user_id: int):
    # Check if avatar exists
    for ext in ('jpg', 'jpeg', 'png', 'gif'):
        path = BANNERS_PATH / f'{user_id}.{ext}'
        print(path)
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

@frontend.route('/card_backgrounds/<user_id>')
async def get_profile_card_background(user_id: int):
    # Check if avatar exists
    for ext in ('jpg', 'jpeg', 'png', 'gif'):
        path = BACKGROUND_PATH / f'{user_id}.{ext}'
        if path.exists():
            return await send_file(path)

    return await send_file(BACKGROUND_PATH / 'default_card.jpg')



@frontend.route('/home')
@frontend.route('/')
async def home():
    if 'authenticated' in session:
        await utils.updateSession(session)
    return await render_template('home.html')

@frontend.route('/login')
async def login():
    if 'authenticated' in session:
        return await flash('error', "You're already logged in!", 'home')

    return await render_template('login.html')

@frontend.route('/login', methods=['POST'])
async def login_post():
    if 'authenticated' in session:
        return await flash('error', "You're already logged in!", 'home')

    if glob.config.debug:
        login_time = time.time_ns()

    form = await request.form
    username = form.get('name', type=str)
    passwd_txt = form.get('password', type=str)

    if username is None or passwd_txt is None:
        return await flash('error', 'Invalid parameters.', 'home')

    # check if account exists
    user_info = await glob.db.fetch(
        'SELECT id, name, email, priv, '
        'pw_bcrypt, silence_end '
        'FROM users '
        'WHERE safe_name = %s',
        [utils.get_safe_name(username)]
    )

    # user doesn't exist; deny post
    # NOTE: Bot isn't a user.
    if not user_info or user_info['id'] == 1:
        if glob.config.debug:
            log(f"{username}'s login failed - account doesn't exist.", Ansi.LYELLOW)
        return await render_template('login.html', error={"type": "name", "msg":"Account does not exist"})

    # cache and other related password information
    bcrypt_cache = glob.cache['bcrypt']
    pw_bcrypt = user_info['pw_bcrypt'].encode()
    pw_md5 = hashlib.md5(passwd_txt.encode()).hexdigest().encode()

    # check credentials (password) against db
    # intentionally slow, will cache to speed up
    if pw_bcrypt in bcrypt_cache:
        if pw_md5 != bcrypt_cache[pw_bcrypt]: # ~0.1ms
            if glob.config.debug:
                log(f"{username}'s login failed - pw incorrect.", Ansi.LYELLOW)
            return await render_template('login.html', error={"type": "password", "msg":"Invalid Password"})
    else: # ~200ms
        if not bcrypt.checkpw(pw_md5, pw_bcrypt):
            if glob.config.debug:
                log(f"{username}'s login failed - pw incorrect.", Ansi.LYELLOW)
            return await render_template('login.html', error={"type": "password", "msg":"Invalid Password"})

        # login successful; cache password for next login
        bcrypt_cache[pw_bcrypt] = pw_md5

    # user not verified; render verify
    if not user_info['priv'] & Privileges.Verified:
        if glob.config.debug:
            log(f"{username}'s login failed - not verified.", Ansi.LYELLOW)
        return await render_template('verify.html')


    # login successful; store session data
    if glob.config.debug:
        log(f"{username}'s login succeeded.", Ansi.LGREEN)

    session['authenticated'] = True
    session['user_data'] = {}
    await utils.updateSession(session, int(user_info['id']))

    if glob.config.debug:
        login_time = (time.time_ns() - login_time) / 1e6
        log(f'Login took {login_time:.2f}ms!', Ansi.LYELLOW)
    return await flash('success', f'Hey, welcome back {username}!', 'home')

@frontend.route('/logout')
async def logout():
    if 'authenticated' not in session:
        return await flash('error', "You can't logout if you aren't logged in!", 'login')

    if glob.config.debug:
        log(f'{session["user_data"]["name"]} logged out.', Ansi.LGREEN)

    # clear session data
    session.pop('authenticated', None)
    session.pop('user_data', None)

    # render login
    return await flash('success', 'Successfully logged out!', 'home')

@frontend.route('/testflash')
@frontend.route('/testflash/<status>/')
@frontend.route('/testflash/<status>/<message>')
async def testflash(status:str="error", message:str="Lorem Ipsum"):
    return await flash(status, message, 'home')

@frontend.route('/lb')
@frontend.route('/leaderboards')
async def leaderboard():
    if 'authenticated' in session:
        await utils.updateSession(session)
    mode = request.args.get('mode', default=0, type=str)
    mods = request.args.get('mods', default="vn", type=str)
    page = request.args.get('page', default="1", type=str)
    country = request.args.get('country', default=None)
    lb_type = request.args.get('type', default="pp", type=str)

    if int(mode) not in range(0, 4):
        mode = 0

    if mods.lower() not in ["vn", "rx", "ap"]:
        mods = "vn"
    else:
        mods = mods.lower()

    try:
        mode = const.mode_to_gulag(int(mode), mods)
    except:
        return await flash('error', 'Cannot use rx with mania or ap with modes other than std', 'home')

    users_count = await glob.db.fetch(
        'SELECT COUNT(s.id) FROM stats s '
        'LEFT JOIN users u USING (id) '
        'WHERE s.mode=%s AND s.pp>0 AND u.priv & 1', mode, _dict=False)
    users_count = users_count[0]
    maxpage = int((float(users_count) + 25 - 1) // 25)

    if page.isdigit == False:
        page = 1
    else:
        page = int(page)

    offset = (int(page)-1)*25
    if int(page) > int(maxpage):
        page = maxpage

    if lb_type.lower() not in ["pp", "score", "plays"]:
        lb_type = "pp"
    elif lb_type.lower() == "score":
        lb_type = "rscore"
    else:
        lb_type = lb_type.lower()

    if country == None or country.lower() not in countries.country_codes:
        country_check = ""
    else:
        country_check = f"AND u.country = '{country.upper()}' "

    lb = await glob.db.fetchall(
        'SELECT u.id as player_id, u.name, u.country, s.tscore, s.rscore, '
        's.pp, s.plays, s.playtime, s.acc, s.max_combo, '
        's.xh_count, s.x_count, s.sh_count, s.s_count, s.a_count, '
        'c.id as clan_id, c.name as clan_name, c.tag as clan_tag '
        'FROM stats s '
        'LEFT JOIN users u USING (id) '
        'LEFT JOIN clans c ON u.clan_id = c.id '
        f'WHERE s.mode = %s AND u.priv & 1 AND s.{lb_type} > 0 '
        f'{country_check}'
        f'ORDER BY s.{lb_type} DESC LIMIT 25 OFFSET %s',
        [mode, offset]
    )

    print(mode, country, page, lb_type)
    if len(lb) == 0:
        lb = False
    else:
        iteration = 0
        for i in lb:
            iteration += 1
            i['rank'] = offset+iteration
            i['x_count'] = int(i['xh_count']) + int(i['x_count'])
            i['s_count'] = int(i['sh_count']) + int(i['s_count'])
            i['typ_e'] = "{:,}".format(i[lb_type])
            del(i['xh_count'])
            del(i['sh_count'])

    if int(mode) in range(0, 4):
        mode_type = "Vanilla"
    elif int(mode) in range(4, 7):
        mode_type = "Relax"
    else:
        mode_type = "Autopilot"

    if lb_type == "pp":
        lb_type_visible = "PP"
    elif lb_type == "plays":
        lb_type_visible = "Playcount"
    else:
        lb_type_visible = lb_type.capitalize()

    mode_name = {"mode": utils.convert_mode_str(const.mode_gulag_rev[int(mode)]), "type": mode_type}

        #Pager
    page_foot = []
    if page == 1:
        page_foot.append([page, "bg-hsl-30"])
        page_foot.append([page+1, "bg-hsl-15-20 hover:bg-hsl-40"])
        page_foot.append([page+2, "bg-hsl-15-20 hover:bg-hsl-40"])
        page_foot.append([page+3, "bg-hsl-15-20 hover:bg-hsl-40"])
        page_foot.append([page+4, "bg-hsl-15-20 hover:bg-hsl-40"])
        page_foot.append([page-1, "bg-hsl-15-20 hover:bg-hsl-40 opacity-70"])
        page_foot.append([page+1, "bg-hsl-15-20 hover:bg-hsl-40"])
    elif page == 2:
        page -= 1
        page_foot.append([page, ""])
        page_foot.append([page+1, " active"])
        page_foot.append([page+2, ""])
        page_foot.append([page+3, ""])
        page_foot.append([page+4, ""])
        page_foot.append([page-1, ""])
        page_foot.append([page+1, ""])
    elif page == maxpage:
        page_foot.append([maxpage-4, ""])
        page_foot.append([maxpage-3, ""])
        page_foot.append([maxpage-2, ""])
        page_foot.append([maxpage-1, ""])
        page_foot.append([maxpage, " active"])
        page_foot.append([maxpage-1, ""])
        page_foot.append([maxpage+1, "disabled"])
    elif page == maxpage-1:
        page_foot.append([maxpage-4, ""])
        page_foot.append([maxpage-3, ""])
        page_foot.append([maxpage-2, ""])
        page_foot.append([maxpage-1, " active"])
        page_foot.append([maxpage, ""])
        page_foot.append([maxpage-1, ""])
        page_foot.append([maxpage+1, ""])
    else:
        page_foot.append([page-2, ""])
        page_foot.append([page-1, ""])
        page_foot.append([page, " active"])
        page_foot.append([page+1, ""])
        page_foot.append([page+2, ""])
        page_foot.append([page-1, ""])
        page_foot.append([page+1, ""])

    return await render_template(
        'leaderboards.html', mode=int(mode), country=country, page=page, lb_type=lb_type,
        lb=lb, mode_name=mode_name, lb_type_visible=lb_type_visible, mods=mods,
        mode_def=const.mode_gulag_rev[mode], max_page=maxpage, page_foot=page_foot
    )

@frontend.route('/relationships')
@frontend.route('/relationships/<r_type>')
async def relationships(r_type:str="friend"):
    if 'authenticated' in session:
        await utils.updateSession(session)
    else:
        return await flash('error', 'You must be logged in to access that page', 'login')
    if r_type.lower() not in ['friend', 'block']:
        return redirect('/relationships/friend')

    res = await glob.db.fetchall(
        'SELECT r.user2, r.type, u.name, u.country, u.priv, u.latest_activity '
        'FROM relationships r '
        'LEFT JOIN users u ON r.user2 = u.id '
        'WHERE r.user1=%s AND r.type=%s '
        'ORDER BY name ASC',
        (session['user_data']['id'], r_type.lower())
    )
    if len(res) == 0:
        res == False
    else:
        now = datetime.datetime.utcnow()
        group_list = []
        for i in res:
            user_priv = Privileges(i['priv'])
            if Privileges.Normal not in user_priv:
                group_list.append(["RESTRICTED", "#FFFFFF"])
            else:
                if int(i['user2']) in glob.config.owners:
                    group_list.append(["OWNER", "#e84118"])
                if Privileges.Dangerous in user_priv:
                    group_list.append(["DEV", "#9b59b6"])
                elif Privileges.Admin in user_priv:
                    group_list.append(["ADM", "#fbc531"])
                elif Privileges.Mod in user_priv:
                    group_list.append(["GMT", "#28a40c"])
                if Privileges.Nominator in user_priv:
                    group_list.append(["BN", "#1e90ff"])
                if Privileges.Alumni in user_priv:
                    group_list.append(["ALU", "#ea8685"])
                if Privileges.Supporter in user_priv:
                    if Privileges.Premium in user_priv:
                        group_list.append(["❤❤", "#f78fb3"])
                    else:
                        group_list.append(["❤", "#f78fb3"])
                elif Privileges.Premium in user_priv:
                    group_list.append(["❤❤", "#f78fb3"])
                if Privileges.Whitelisted in user_priv:
                    group_list.append(["✓", "#28a40c"])
                i['badges'] = group_list
                group_list = []
                i['latest_activity'] = time_ago(datetime.datetime.utcnow(), to_datetime(datetime.datetime.fromtimestamp(i['latest_activity']), format="%Y-%m-%d %H:%M:%S"), time_limit=1) + "ago"
    return await render_template('relationships.html', type=r_type, res=res)

@frontend.route('/scores')
@frontend.route('/scores/<mods>/<scoreid>')
@frontend.route('/scores/<scoreid>')
async def scores(mods:str="vn", scoreid:int="0"):
    if 'authenticated' in session:
        await utils.updateSession(session)

    if mods.lower() not in ["vn", "rx", "ap"]:
        mods = "vn"
    if mods == None:
        mods = "vn"

    #Get score
    s = await glob.db.fetch(
        'SELECT s.id, s.score, s.pp, s.acc, s.max_combo, s.mods, '
        's.n300, s.n100, s.n50, s.nmiss, s.nkatu, s.ngeki, s.grade, '
        's.mode, s.play_time, s.userid, s.perfect, m.artist, m.title, '
        'm.id AS `map_id`, m.set_id, m.version AS `diffname`, m.creator, '
        'm.max_combo AS `map_maxcombo`, m.diff, u.country, u.name, u.priv '
       f'FROM scores_{mods} s '
        'LEFT JOIN maps m ON s.map_md5 = m.md5 '
        'LEFT JOIN users u ON s.userid = u.id '
        'WHERE s.id = %s',
        [scoreid]
    )
    if not s:
        return await flash('error', 'This score does not exist or for some reason map is not in the database', 'home')

    if Privileges.Normal not in Privileges(int(s['priv'])):
        if session['user_data']['is_mod'] == False and session['user_data']['is_admin'] == False:
            return await render_template('errors/404.html')

    # Redefine variables
    s['score'] = "{:,}".format(s['score'])
    s['diff'] = round(float(s['diff']), 2)

    ugrade = s['grade']
    s['grade'] = []
    s['grade'].append(const.grade_coverter[ugrade])
    s['grade'].append(const.grade_colors[ugrade])
    del(ugrade)
    s['play_time'] = s['play_time'].strftime("%d.%m.%Y %H:%M")

    diffColor = getDiffColor(float(s['diff']))
    return await render_template('scorepage.html', s=s, diffColor=diffColor)


#!####################################################!#
#!##################  PROFILE ZONE  ##################!#
#!####################################################!#
@frontend.route('/profile')
@frontend.route('/profile/<id>')
@frontend.route('/profile/<id>/<page_type>')
async def profile(id:str=None, page_type:str='home'):
    if id == None:
        return (await render_template('errors/404.html'), 404)
    user_data = await glob.db.fetch(
        'SELECT name, safe_name, id, priv, country, clan_id '
        'FROM users '
        'WHERE safe_name IN (%s) OR id IN (%s) LIMIT 1',
        [id, utils.get_safe_name(id)]
    )
    # no user
    if not user_data:
        return (await render_template('404.html'), 404)

    #Update session
    if 'authenticated' in session:
        await utils.updateSession(session)

    return await render_template('profile/home.html', user_data=user_data)