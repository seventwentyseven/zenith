export enum UserPrivileges {
  // Normal users
  UNRESTRICTED = 1 << 0,
  VERIFIED = 1 << 1,
  FROZEN = 1 << 2, // Read-only mode for the user

  // has bypass to low-ceiling anticheat measures (trusted).
  WHITELISTED_STD_VN = 1 << 3,
  WHITELISTED_TAIKO_VN = 1 << 4,
  WHITELISTED_CATCH_VN = 1 << 5,
  WHITELISTED_MANIA_VN = 1 << 6,
  WHITELISTED_STD_RX = 1 << 7,
  WHITELISTED_TAIKO_RX = 1 << 8,
  WHITELISTED_CATCH_RX = 1 << 9,
  WHITELISTED_STD_AP = 1 << 10,

  // Elevated users
  SUPPORTER = 1 << 11, // Has supporter tag
  ALUMNI = 1 << 12, // Ex-Staff member with big contributions
  TOURNAMENT_MANAGER = 1 << 13, // Can create tournaments

  // Staff (Nominators) Access to ranking maps
  NOMINATOR_STD = 1 << 14,
  NOMINATOR_TAIKO = 1 << 15,
  NOMINATOR_CATCH = 1 << 16,
  NOMINATOR_MANIA = 1 << 17,
  QAT_STD = 1 << 18,
  QAT_TAIKO = 1 << 19,
  QAT_CATCH = 1 << 20,
  QAT_MANIA = 1 << 21,

  MODERATOR = 1 << 22, // Access to moderation tools
  COMMUNITY_MANAGER = 1 << 23, // MOD+ADMIN + Posting articles and news
  ADMINISTRATOR = 1 << 24, // MOD + ADMIN
  HEAD_ADMIN = 1 << 25, // MOD+ADMIN + Managing staff
  DEVELOPER = 1 << 26, // Full access to everything
  OWNER = 1 << 27, // Allmighty one

  NOMINATORS = NOMINATOR_STD |
    NOMINATOR_CATCH |
    NOMINATOR_TAIKO |
    NOMINATOR_MANIA,

  QATS = QAT_STD | QAT_CATCH | QAT_TAIKO | QAT_MANIA,

  PERKS = SUPPORTER |
    ALUMNI |
    NOMINATORS |
    QATS |
    MODERATOR |
    COMMUNITY_MANAGER |
    ADMINISTRATOR |
    HEAD_ADMIN |
    DEVELOPER |
    OWNER,

  STAFF = MODERATOR |
    COMMUNITY_MANAGER |
    ADMINISTRATOR |
    HEAD_ADMIN |
    DEVELOPER |
    OWNER,

  WHITELISTED = WHITELISTED_STD_VN |
    WHITELISTED_TAIKO_VN |
    WHITELISTED_CATCH_VN |
    WHITELISTED_MANIA_VN |
    WHITELISTED_STD_RX |
    WHITELISTED_TAIKO_RX |
    WHITELISTED_CATCH_RX |
    WHITELISTED_STD_AP
}
