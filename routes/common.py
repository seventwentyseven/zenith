import bcrypt
import datetime as dt

from quart import Blueprint
from quart import redirect
from quart import render_template
from quart import request
from quart import send_file
from quart import session
from quart import flash

import app.state
import zenith.config

common = Blueprint('common', __name__)

@common.route('/', methods=['GET'])
async def index():
    if 'authenticated' in session:
        return await render_template('/pages/common/index.html')
    else:
        return await render_template('/pages/common/index_guest.html')