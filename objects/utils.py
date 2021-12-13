# -*- coding: utf-8 -*-

from typing import Optional
from typing import TYPE_CHECKING

from cmyui.logging import Ansi
from cmyui.logging import log
import datetime
from pathlib import Path
from quart import render_template
from quart import session

from objects import glob
from objects import utils
from objects.privileges import Privileges
from const.constants import diffColorsDomain
if TYPE_CHECKING:
    from PIL import Image

async def flash(status: str, msg: str, template: str) -> str:
    """Flashes a success/error message on a specified template."""
    return await render_template(f'{template}.html', flash=msg, status=status)

async def flash_with_customizations(status: str, msg: str, template: str) -> str:
    """Flashes a success/error message on a specified template. (for customisation settings)"""
    profile_customizations = utils.has_profile_customizations(session['user_data']['id'])
    return await render_template(
        template_name_or_list=f'{template}.html',
        flash=msg,
        status=status,
        customizations=profile_customizations
    )

def get_safe_name(name: str) -> str:
    """Returns the safe version of a username."""
    # Safe name should meet few criterias.
    # - Whole name should be lower letters.
    # - Space must be replaced with _
    return name.lower().replace(' ', '_')

def convert_mode_int(mode: str) -> Optional[int]:
    """Converts mode (str) to mode (int)."""
    if mode not in _str_mode_dict:
        print('invalid mode passed into utils.convert_mode_int?')
        return
    return _str_mode_dict[mode]

_str_mode_dict = {
    'std': 0,
    'taiko': 1,
    'catch': 2,
    'mania': 3
}

def convert_mode_str(mode: int) -> Optional[str]:
    """Converts mode (int) to mode (str)."""
    if mode not in _mode_str_dict:
        print('invalid mode passed into utils.convert_mode_str?')
        return
    return _mode_str_dict[mode]

_mode_str_dict = {
    0: 'std',
    1: 'taiko',
    2: 'catch',
    3: 'mania'
}

async def fetch_geoloc(ip: str) -> str:
    """Fetches the country code corresponding to an IP."""
    url = f'http://ip-api.com/line/{ip}'

    async with glob.http.get(url) as resp:
        if not resp or resp.status != 200:
            if glob.config.debug:
                log('Failed to get geoloc data: request failed.', Ansi.LRED)
            return 'xx'
        status, *lines = (await resp.text()).split('\n')
        if status != 'success':
            if glob.config.debug:
                log(f'Failed to get geoloc data: {lines[0]}.', Ansi.LRED)
            return 'xx'
        return lines[1].lower()

async def validate_captcha(data: str) -> bool:
    """Verify `data` with hcaptcha's API."""
    url = f'https://hcaptcha.com/siteverify'

    data = {
        'secret': glob.config.hCaptcha_secret,
        'response': data
    }

    async with glob.http.post(url, data=data) as resp:
        if not resp or resp.status != 200:
            if glob.config.debug:
                log('Failed to verify captcha: request failed.', Ansi.LRED)
            return False

        res = await resp.json()

        return res['success']

def get_required_score_for_level(level: int) -> float:
	if level <= 100:
		if level >= 2:
			return 5000 / 3 * (4 * (level ** 3) - 3 * (level ** 2) - level) + 1.25 * (1.8 ** (level - 60))
		elif level <= 0 or level == 1:
			return 1.0  # Should be 0, but we get division by 0 below so set to 1
	elif level >= 101:
		return 26931190829 + 1e11 * (level - 100)

def get_level(totalScore: int) -> int:
	level = 1
	while True:
		# Avoid endless loops
		if level > 120:
			return level

		# Calculate required score
		reqScore = get_required_score_for_level(level)

		# Check if this is our level
		if totalScore <= reqScore:
			# Our level, return it and break
			return level - 1
		else:
			# Not our level, calculate score for next level
			level += 1

BANNERS_PATH = Path.cwd() / '.data/banners'
BACKGROUND_PATH = Path.cwd() / '.data/backgrounds'
def has_profile_customizations(user_id: int = 0) -> dict[str, bool]:
    # check for custom banner image file
    for ext in ('jpg', 'jpeg', 'png', 'gif'):
        path = BANNERS_PATH / f'{user_id}.{ext}'
        if has_custom_banner := path.exists():
            break

    # check for custom background image file
    for ext in ('jpg', 'jpeg', 'png', 'gif'):
        path = BACKGROUND_PATH / f'{user_id}.{ext}'
        if has_custom_background := path.exists():
            break

    return {
        'banner' : has_custom_banner,
        'background': has_custom_background
    }

def crop_image(image: 'Image') -> 'Image':
    width, height = image.size
    if width == height:
        return image

    offset = int(abs(height-width) / 2)

    if width > height:
        image = image.crop([offset, 0, width-offset, height])
    else:
        image = image.crop([0, offset, width, height-offset])

    return image

def determine_plural(number:int):
    if int(number) != 1:
        return 's'
    else:
        return ''

def time_ago(time1, time2, time_limit:int=0):
    """Calculate time ago between two dates"""
    time_diff = time1 - time2
    timeago = datetime.datetime(1,1,1) + time_diff
    time_limit = time_limit
    time_ago = ""
    if timeago.year-1 != 0:
        time_ago += "{} Year{} ".format(timeago.year-1, determine_plural(timeago.year-1))
        time_limit = time_limit + 1
    if timeago.month-1 !=0:
        time_ago += "{} Month{} ".format(timeago.month-1, determine_plural(timeago.month-1))
        time_limit = time_limit + 1
    if timeago.day-1 !=0 and not time_limit == 2:
        time_ago += "{} Day{} ".format(timeago.day-1, determine_plural(timeago.day-1))
        time_limit = time_limit + 1
    if timeago.hour != 0 and not time_limit == 2:
        time_ago += "{} Hour{} ".format(timeago.hour, determine_plural(timeago.hour))
        time_limit = time_limit + 1
    if timeago.minute != 0 and not time_limit == 2:
        time_ago += "{} Minute{} ".format(timeago.minute, determine_plural(timeago.minute))
        time_limit = time_limit + 1
    if not time_limit == 2:
        time_ago += "{} Second{} ".format(timeago.second, determine_plural(timeago.second))
    return time_ago

async def updateSession(session, id:int=None):
    if 'id' in session['user_data']:
        id = session['user_data']['id']
    elif id != None:
        id = id
    else:
        raise ValueError('Could not get id of a user.')

    user_info = await glob.db.fetch(
        'SELECT id, name, email, priv, '
        'pw_bcrypt, silence_end '
        'FROM users '
        'WHERE id = %s', id
    )
    session['authenticated'] = True
    session['user_data'] = {
        'id': user_info['id'],
        'name': user_info['name'],
        'email': user_info['email'],
        'priv': int(user_info['priv']),
        'silence_end': user_info['silence_end'],
    }
    if Privileges.Nominator in Privileges(session['user_data']['priv']):
        session['user_data']['is_bn'] = True
    else:
        session['user_data']['is_bn'] = False
    if Privileges.Mod in Privileges(session['user_data']['priv']):
        session['user_data']['is_mod'] = True
    else:
        session['user_data']['is_mod'] = False
    if Privileges.Admin in Privileges(session['user_data']['priv']):
        session['user_data']['is_admin'] = True
    else:
        session['user_data']['is_admin'] = False
    if Privileges.Dangerous in Privileges(session['user_data']['priv']):
        session['user_data']['is_dev'] = True
    else:
        session['user_data']['is_dev'] = False
    if int(session['user_data']['is_dev']) in glob.config.owners:
        session['user_data']['is_owner'] = True
    else:
        session['user_data']['is_owner'] = False

def getDiffColor(value:float=0):
    if value <= 9:
        return diffColorsDomain(value).hexcode
    elif value <= 0.1:
        return "#AAAAAA"
    else:
        return "#000000"

def parseJudgements(score:dict):
    """Pass score from db, returns judgements dict."""
    # Modes sorted by how often they are played
    if score['mode'] == 0:
        judges = {
            '300':       score['n300'],
            '100':       score['n100'],
            '50':        score['n50'],
            'miss':      score['nmiss']
        }
    elif score['mode'] == 3:
        judges = {
            'MAX':       score['ngeki'],
            '300':       score['n300'],
            '200':       score['nkatu'],
            '100':       score['n100'],
            '50':        score['n50'],
            'miss':      score['nmiss']
        }
    elif score['mode'] == 1:
        judges = {
            '300':       score['n300'],
            '50':        score['n50'],
            'miss':      score['nmiss']
        }
    elif score['mode'] == 2:
        judges = {
            'fruits':    score['n300'],
            'ticks':     score['n100'],
            'drip miss': score['n50'],
            'miss':      score['nmiss']
        }

    return judges