# -*- coding: utf-8 -*-

__all__ = ()

import os
import time
import datetime
from pandas import to_datetime

from cmyui.logging import Ansi
from cmyui.logging import log
from cmyui.osu import Mods
from PIL import Image
from pathlib import Path
from quart import Blueprint
from quart import redirect
from quart import render_template
from quart import request
from quart import session
from quart import send_file

from objects import glob
from const.constants import mode_gulag_rev, tables

api = Blueprint('api', __name__)

@api.route('/get_records')
async def get_records():
    records = {}
    for i in range(0, 8):
        records[i] = await glob.db.fetch(
            f'SELECT {tables[i]}.id, {tables[i]}.pp, {tables[i]}.userid, '
            f'maps.set_id, users.name FROM {tables[i]} LEFT JOIN users ON '
            f'{tables[i]}.userid = users.id LEFT JOIN maps ON {tables[i]}.map_md5 = '
            f'maps.md5 WHERE {tables[i]}.mode = {mode_gulag_rev[i]} && maps.status=2 '
             '&& users.priv & 1 ORDER BY pp DESC LIMIT 1;'
        )

    return {"code": 200, "status": "success", "records": records}