import datetime as dt

from quart import Blueprint
from quart import request
from quart import send_file
from quart import session

import app.state
import zenith.config

commonapi = Blueprint('commonapi', __name__)

@commonapi.route('/', methods=['GET'])
async def index():
    return {"h": "ż"}