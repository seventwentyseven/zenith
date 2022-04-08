# -*- coding: utf-8 -*-

__all__ = ()

import datetime
import hashlib
import os
from re import S
import time
from markdown import markdown as md
from PIL import Image

import bcrypt
from app.constants.privileges import Privileges
from app.objects.player import Player
from app.state import website as zglob
import app.state
from cmyui.logging import Ansi, log
from pathlib import Path
from quart import (Blueprint, redirect, render_template, request, send_file,
                   session)
from zenith import zconfig
from zenith.objects import regexes, utils
from zenith.objects.utils import flash, flash_tohome, validate_password
from app.constants import gamemodes
from app.constants.mods import Mods
from app.constants.privileges import Privileges

admin = Blueprint('admin', __name__)

@admin.route('/')
async def index():
    return redirect('/admin/dashboard')

@admin.route('/home')
@admin.route('/dashboard')
async def dashboard():
    if 'authenticated' not in session:
        return redirect('/login')
    else:
        await utils.updateSession(session)

    if session['user_data']['is_admin'] == False:
        return await flash_tohome('error', 'You do not have permissions to enter this page.')


    return await render_template('admin/dashboard.html')

@admin.route('/users')
async def users():
    if 'authenticated' not in session:
        return redirect('/login')
    else:
        await utils.updateSession(session)

    if session['user_data']['is_admin'] == False:
        return await flash_tohome('error', 'You do not have permissions to enter this page.')

    return await render_template('admin/users.html')
