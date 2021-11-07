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
from quart import Blueprint
from quart import redirect
from quart import render_template
from quart import request
from quart import session
from quart import send_file

from objects import glob


frontend = Blueprint('frontend', __name__)

@frontend.route('/home')
@frontend.route('/')
async def home():
    return await render_template('home.html')
