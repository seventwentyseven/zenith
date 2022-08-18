from typing import Any

import asyncio
import datetime as dt
from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v1.api.metrics_api import MetricsApi
from datadog_api_client.v1.model.point import Point

import app.state
from app.utils import log, Ansi

CACHE = app.state.web.cache['data']

__all__ = ("init_web_housekeeping_tasks", "Cache")

async def init_web_housekeeping_tasks() -> None:
    """Create tasks for each website housekeeping tasks."""
    log("Initializing website housekeeping tasks.", Ansi.LCYAN)

    loop = asyncio.get_running_loop()

    app.state.sessions.housekeeping_tasks.update(
        {
            loop.create_task(task)
            for task in (
                _update_home_cache(interval=10 * 60),
                _users_online(interval=30 * 60),
            )
        },
    )

class Cache:
    """
    Chaching tools and utils
    """
    def __init__(self) -> None:
        self = CACHE

    def set(key:str, value: Any, ttl: int) -> None:
        """
        Set value in cache
         Parameters:
            key: str - key to set
            value: Any - value to set
            ttl: dt.timedelta - time to live (timedelta, saved as UTC time)
        """
        ttl = dt.datetime.utcnow() + dt.timedelta(minutes=ttl)
        CACHE[key] = (value, ttl)

    def get(key:str) -> Any:
        """
        Get value from cache
        """
        if key in CACHE:
            return CACHE[key][0]

    def delete(self, key:str) -> None:
        """
        Delete value from cache
        """
        if key in CACHE:
            del CACHE[key]



async def _update_home_cache(interval:int) -> None:
    """
    Update the home cache
    """
    while True:
        recent_ranked = await app.state.services.database.fetch_all(
            "SELECT r.userid, r.setid, r.status, "
            "r.date, m.title, m.artist, u.name, m.mode "
            "FROM recent_ranked r "
            "LEFT JOIN maps m ON r.setid = m.set_id "
            "LEFT JOIN users u ON r.userid = u.id "
            "WHERE r.status = 2 OR r.status = 5 "
            "ORDER BY r.date DESC LIMIT 3"
        )

        most_played_24h = await app.state.services.database.fetch_all(
            "SELECT m.id, m.set_id, m.title, m.artist, "
            "m.mode, m.version, COUNT(*) as plays "
            "FROM maps m LEFT JOIN scores s ON m.md5=s.map_md5 "
            "WHERE s.play_time >= CURRENT_DATE - INTERVAL 30 DAY "
            "GROUP BY m.id ORDER BY plays DESC LIMIT 3",
        )

        articles = await app.state.services.database.fetch_all(
            "SELECT a.*, u.name author_name FROM articles a "
            "LEFT JOIN users u ON a.author=u.id "
            "ORDER BY date_posted DESC LIMIT 8"
        )

        articles = [dict(article) for article in articles]
        most_played_24h = [dict(played) for played in most_played_24h]
        recent_ranked = [dict(ranked) for ranked in recent_ranked]

        # Truncate the articles to the 300 character limit
        for article in articles:
            article['content'] = article['content'][:300] + "..."

        Cache.set("articles", articles, interval)
        Cache.set("most_played_24h", most_played_24h, interval)
        Cache.set("recent_ranked", recent_ranked, interval)

        # Sleep for interval
        await asyncio.sleep(interval)

async def _users_online(interval:int) -> None:
    # Define configuration and set it's values, due to
    # how shitty the API is, it's made like that, sorry! :c
    dd_config = Configuration()
    dd_config.host = config.DD_API_HOST
    dd_config.api_key['apiKeyAuth'] = config.DD_API_KEY
    dd_config.api_key['appKeyAuth'] = config.DD_APP_KEY

    # Create a new client and create api instance
    with ApiClient(dd_config) as api_client:
        dd_client = MetricsApi(api_client)

        res = dd_client.query_metrics(
            _from=int((dt.datetime.utcnow() - dt.timedelta(days=1)).timestamp()), #TD - 1 day
            to=int(dt.datetime.utcnow().timestamp()), # Timestamp for now
            query="max:bancho.online_players{*}.rollup(max, 5)",
        )
        res = res['series'][0]['pointlist'] # Why is it so fucked?

        # Process response data
        data = []
        for el in res:
            data.append(el._data_store['value'])

        # Save data to cache
        Cache.set("online_data", data, interval)

        # Sleep for interval
        await asyncio.sleep(interval)
