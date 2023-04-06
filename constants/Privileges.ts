export enum Privileges {
  // Normal users
  Unrestricted = 1 << 0,
  Verified = 1 << 1,
  Frozen = 1 << 2, // Read-only mode for the user

  // has bypass to low-ceiling anticheat measures (trusted).
  WhitelistedStdVn = 1 << 3,
  WhitelistedTaikoVn = 1 << 4,
  WhitelistedCatchVn = 1 << 5,
  WhitelistedManiaVn = 1 << 6,
  WhitelistedStdRx = 1 << 7,
  WhitelistedTaikoRx = 1 << 8,
  WhitelistedCatchRx = 1 << 9,
  WhitelistedStdAp = 1 << 10,

  // Elevated users
  Supporter = 1 << 11, // Has supporter tag
  Alumni = 1 << 12, // Ex-Staff member with big contributions
  TournamentManager = 1 << 13, // Can create tournaments

  // Staff (Nominators) Access to ranking maps
  NominatorStd = 1 << 14,
  NominatorTaiko = 1 << 15,
  NominatorCatch = 1 << 16,
  NominatorMania = 1 << 17,
  QatStd = 1 << 18,
  QatTaiko = 1 << 19,
  QatCatch = 1 << 20,
  QatMania = 1 << 21,

  Moderator = 1 << 22, // Access to moderation tools
  CommunityManager = 1 << 23, // MOD+ADMIN + Posting articles and news
  Administrator = 1 << 24, // MOD + ADMIN
  HeadAdmin = 1 << 25, // MOD+ADMIN + Managing staff
  Developer = 1 << 26, // Full access to everything
  Owner = 1 << 27, // Allmighty one

  Nominators = NominatorStd | NominatorCatch | NominatorTaiko | NominatorMania,

  Qats = QatStd | QatCatch | QatTaiko | QatMania,

  Perks = Supporter |
    Alumni |
    Nominators |
    Qats |
    Moderator |
    CommunityManager |
    Administrator |
    HeadAdmin |
    Developer |
    Owner,

  Staff = Moderator |
    CommunityManager |
    Administrator |
    HeadAdmin |
    Developer |
    Owner,

  Whitelisted = WhitelistedStdVn |
    WhitelistedTaikoVn |
    WhitelistedCatchVn |
    WhitelistedManiaVn |
    WhitelistedStdRx |
    WhitelistedTaikoRx |
    WhitelistedCatchRx |
    WhitelistedStdAp
}

const hasRole = (
  userPrivileges: Privileges,
  privilegesToCheck: Privileges
): boolean => {
  for (const privilege in Privileges) {
    if (isNaN(Number(privilege))) {
      const privilegeValue = Privileges[privilege]
      if (
        typeof privilegeValue === 'number' &&
        (privilegesToCheck & privilegeValue) === privilegeValue
      ) {
        if ((userPrivileges & privilegeValue) === privilegeValue) {
          return true
        }
      }
    }
  }
  return false
}

export const isStaff = (privileges: Privileges) => {
  return hasRole(privileges, Privileges.Staff)
}

export const isNominator = (privileges: Privileges) => {
  return hasRole(privileges, Privileges.Nominators)
}

export const isQAT = (privileges: Privileges) => {
  return hasRole(privileges, Privileges.Qats)
}

export const isWhitelisted = (privileges: Privileges) => {
  return hasRole(privileges, Privileges.Whitelisted)
}

export const hasPerks = (privileges: Privileges) => {
  return hasRole(privileges, Privileges.Perks)
}
