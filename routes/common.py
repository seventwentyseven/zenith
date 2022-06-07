import bcrypt
import datetime as dt

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
        flash('You are already logged in.', 'warning')
        return redirect(url_for('index'))
    form = await request.form
    print(form)
    # Flash errors if the form is invalid
    await flash('Please fill in all fields.', 'error')
    await flash('Please fill in all fields.', 'warning')
    await flash('Please fill in all fields.', 'success')
    await flash('Please fill in all fields.', 'error')
    await flash('Please fill in all fields.', 'warning')
    await flash('Please fill in all fields.', 'success')
    return redirect(url_for('common.home'))
