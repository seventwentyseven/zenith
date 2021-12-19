# -*- coding: utf-8 -*-

from enum import IntFlag
from enum import unique

__all__ = ('AntiPrivileges')

@unique
class AntiPrivileges(IntFlag):
    """Antiprivileges for denying something to user."""
    avatar_change = 1 << 0
    banner_change = 1 << 1
    background_change = 1 << 2
    aboutme_change = 1 << 3
    request_beatmaps = 1 << 4

    create_clans = 1 << 10
    clan_banner_change = 1 << 11
    clan_background_change = 1 << 12
    clan_avatar_change = 1 << 13
    
