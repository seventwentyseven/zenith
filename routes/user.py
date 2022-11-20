from __future__ import annotations

import datetime as dt
import os
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

user = Blueprint('user', __name__)

BANNERS_PATH = Path.cwd() / '.data/banners'
BG_PATH = Path.cwd() / '.data/backgrounds'


@user.route('/u/<id>')
@user.route('/user/<id>')
@user.route('/user/<id>/home')
async def user_home(id: int = None):
    mode = request.args.get('mode', type=int, default=None)

    if user := await app.state.services.database.fetch_one(
        "SELECT u.id, u.name, u.priv, u.creation_time, "
        "u.latest_activity, u.country, clan_id, c.name, c.tag, "
        "cu.discord_id, cu.interests, cu.website, cu.location, "
        "cu.discord_tag, u.play_style, u.preferred_mode, u.userpage_content "
        "FROM users u "
        "LEFT JOIN clans c ON u.clan_id = c.id "
        "LEFT JOIN customs cu ON u.id = cu.userid "
        "WHERE u.id = :uid",
        {'uid': id}
    ):
        user = dict(user)
    else:
        return await render_template('404.html'), 404

    if not mode:
        mode = user['preferred_mode']

    if type(mode) != int or mode not in range(0, 8):
        await flash('Mode must be a hole number in range 0-8', category='error')
        return redirect(url_for('user.home', id=id))

    return await render_template('/pages/user/home.html', mode=mode)
