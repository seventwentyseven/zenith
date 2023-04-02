export enum Privileges {
  // Normal users
  Unrestricted = 1 << 0,
  Verified = 1 << 1,
  Frozen = 1 << 2, // Read-only mode for the user

  // has bypass to low-ceiling anticheat measures (trusted).
  WhitelistedStd = 1 << 3,
  WhitelistedTaiko = 1 << 4,
  WhitelistedCatch = 1 << 5,
  WhitelistedMania = 1 << 6,

  // Elevated users
  Supporter = 1 << 7, // Has supporter tag
  Alumni = 1 << 8, // Ex-Staff member with big contributions
  TournamentManager = 1 << 9, // Can create tournaments

  // Staff (Nominators) Access to ranking maps
  NominatorStd = 1 << 10,
  NominatorTaiko = 1 << 11,
  NominatorCatch = 1 << 12,
  NominatorMania = 1 << 13,
  QatStd = 1 << 14,
  QatTaiko = 1 << 15,
  QatCatch = 1 << 16,
  QatMania = 1 << 17,

  Moderator = 1 << 18, // Access to moderation tools
  CommunityManager = 1 << 19, // MOD+ADMIN + Posting articles and news
  Administrator = 1 << 20, // MOD + ADMIN
  HeadAdmin = 1 << 21, // MOD+ADMIN + Managing staff
  Developer = 1 << 22, // Full access to everything
  Owner = 1 << 23, // Allmighty one

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

  Whitelisted = WhitelistedStd |
    WhitelistedTaiko |
    WhitelistedCatch |
    WhitelistedMania
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
