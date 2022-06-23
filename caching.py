from typing import Any
import app.state
import asyncio
from app.utils import log, Ansi
import datetime as dt

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
            "SELECT id, set_id, artist, title, version, creator FROM maps WHERE (status=2 OR status=5) AND frozen=1 ORDER BY id DESC LIMIT 3"
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

        Cache.set("articles", articles, 10)
        Cache.set("most_played_24h", most_played_24h, 10)
        Cache.set("recent_ranked", recent_ranked, 10)

        # Sleep for interval
        await asyncio.sleep(interval)
