import datetime as dt

from quart import Blueprint
from quart import request
from quart import send_file
from quart import session

import app.state
import zenith.config
from zenith.caching import Cache

commonapi = Blueprint('commonapi', __name__)

@commonapi.route('/', methods=['GET'])
async def index():
    print(app.state.web.cache)
    return {"the": "j"}


@commonapi.route('/home/', methods=['GET'])
async def home():
    return {
            "success": True,
            "articles": Cache.get('articles'),
            "recent_ranked": Cache.get('recent_ranked'),
            "most_played_24h": Cache.get('most_played_24h'),
    }, 200

# Route for getting point data for online users graph (last 24h)
@commonapi.route('/online_data/', methods=['GET'])
async def online_data():
    return {
            "success": True,
            "data": Cache.get('online_data'),
    }, 200

