# -*- coding: utf-8 -*-
import app.settings as mainconf
# app name
app_name_short = '727.xyz'
app_name_long = 'SevenTwentySeven'

# secret key
secret_key = 'T=o:R-[I4RKt5db]Y4Cgte{y*`ijvN^i"_r!E8.k?+F/$Nc@TUg-eJ}EW+:G6O+X-MvXG/6KF=1nVphJUL7>:iA`("7&:MX,l:vp7Sk&}_zkop2su$N6.I!i<tu[H"o@'

#hCaptcha settings:
hCaptcha_sitekey = '41082a34-2db2-4399-947b-06b7bcb84a2a'
hCaptcha_secret = '0xcdF6343d4cff0fBd03b57ee772f0896B62b23c57'

# mailjet api key
mailjet_key = '62bf24b0bc57ca555c774d04b9e711fb'
mailjet_secret = 'e2c287462ef92f582de746713a94baa0'

# domain (used for api, avatar, etc)
domain = mainconf.DOMAIN

# path to gulag root (must have leading and following slash)
path_to_gulag = '/opt/gulag/'

# enable debug (disable when in production to improve performance)
debug = False

# disallowed names (hardcoded banned usernames)
disallowed_names = {
    'cookiezi', 'rrtyui',
    'hvick225', 'qsc20010'
}

# disallowed passwords (hardcoded banned passwords)
disallowed_passwords = {
    'password', 'minilamp'
}

# enable registration
registration = True

owners = [3,4]
# social links (used throughout guweb)
github = 'https://github.com/seventwentyseven/'
discord_server = 'https://discord.gg/JA9YNADqdW'
youtube = 'https://youtube.com/'
twitter = 'https://twitter.com/seventwentyseven'
instagram = 'https://instagram.com/'
