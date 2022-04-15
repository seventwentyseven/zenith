# -*- coding: utf-8 -*-

__all__ = ()

import bcrypt
import datetime
import hashlib
from cmyui.logging import Ansi, log
from markdown import markdown as md
from PIL import Image
from pathlib import Path
from quart import (Blueprint, redirect, render_template, request, send_file,
                   session)

import app.state
from app.state import website as zglob
from app.constants.privileges import Privileges
from app.objects.player import Player

from zenith import zconfig
from zenith.objects import utils
from zenith.objects.utils import flash_tohome, adminerror


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

@admin.route('/users/edit/<uid>')
async def edit_user(uid:int):
    if 'authenticated' not in session:
        return redirect('/login')
    else:
        await utils.updateSession(session)

    if session['user_data']['is_admin'] == False:
        return await flash_tohome('error', 'You do not have permissions to enter this page.')

    # Check if user exists
    user = await app.state.services.database.fetch_one(
        "SELECT id, name, priv, email, creation_time, latest_activity, "
        "country, silence_end, donor_end, clan_id, clan_priv, userpage_content "
        "FROM users WHERE id = :uid",
        {'uid': uid}
    )
    if not user:
        return await flash_tohome('error', 'User does not exist.')
    else:
        user = dict(user)

    #! Privilege checks
    apriv = int(session['user_data']['priv'])
    tpriv = user['priv']
    # Rank privilge check
    if session['user_data']['id'] not in zconfig.owners: # Owners can do basically anything so pass this
        # Developers (16384) can edit Nominators, GMT, Admins but not DEVs and owners
        if user['id'] == 1:
            return await adminerror('You do not have permissions to edit this user.')
        if apriv & 16384:
            if user['id'] in zconfig.owners:
                return await adminerror('You do not have permissions to edit this user.')
            if tpriv * 16384:
                return await adminerror('You do not have permissions to edit this user.')
        # Admins (8192) can edit Everyone up to lowest staff team member (GMT)
        # Yes BN is a staff member, but for security reasons we'll allow admins to edit them
        elif apriv & 8192:
            if user['id'] in zconfig.owners:
                return await adminerror('You do not have permissions to edit this user.')
            if tpriv & 16384:
                return await adminerror('You do not have permissions to edit this user.')
            if tpriv & 8192:
                return await adminerror('You do not have permissions to edit this user.')
            if tpriv & 4096:
                return await adminerror('You do not have permissions to edit this user.')
        else:
            return await flash_tohome('error', "You shouldn't be there.")

    if user['clan_id'] != 0:
        clan = await app.state.services.database.fetch_one(
            "SELECT * FROM clans WHERE id=:clan_id",
            {"clan_id": user['clan_id']}
        )
        clan = dict(clan)
    else:
        clan = None

    customs = await app.state.services.database.fetch_one(
        "SELECT * FROM customs WHERE userid=:uid",
        {'uid': uid}
    )
    if not customs:
        customs = None
    else:
        customs = dict(customs)

    return await render_template('admin/edituser.html', user=user, clan=clan, customs=customs)

