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
    return {"the": "j"}

@commonapi.route('/home', methods=['GET'])
async def home():
    r_type = request.args.get('type', default="guest", type=str)
    async with app.state.services.database.connection() as conn:
        # Response is the guest homepage data
        if r_type == "guest":
            users = await conn.fetch_val("SELECT COUNT(id) FROM users")
            scores = await conn.fetch_val("SELECT COUNT(id) FROM scores")
            c_rankeds = await conn.fetch_val("SELECT COUNT(id) FROM maps WHERE frozen = 1 AND status in (2,5)")
            return {"success": True, "users": users-1, "scores": scores, "rankeds": c_rankeds}

        elif r_type == "user":
            return await app.state.web.home_user(request)
        else:
            return {"success": False, "error": "Invalid type, must be 'guest' or 'user'"}