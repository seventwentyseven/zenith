from __future__ import annotations

import datetime as dt
import os
from pyrsistent import T
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

user = Blueprint('user', __name__)

BANNERS_PATH = Path.cwd() / '.data/banners'
BG_PATH = Path.cwd() / '.data/backgrounds'

@user.route('/u/<id>')
@user.route('/user/<id>')
@user.route('/user/<id>/home')
async def user_home(id: int=None):
    mode = request.args.get('mode', type=int, default=None)

    if not mode:
        pass # Check user's default mode

    if type(mode) != int or mode not in range(0,8):
        await flash('Mode must be a hole number in range 0-8', category='error')
    
    

