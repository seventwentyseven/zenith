import { Privileges } from '../constants/Privileges'

const hasRank = (
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

const isStaff = (privileges: Privileges) => {
  return hasRank(privileges, Privileges.Staff)
}

const isNominator = (privileges: Privileges) => {
  return hasRank(privileges, Privileges.Nominators)
}

const isQat = (privileges: Privileges) => {
  return hasRank(privileges, Privileges.Qats)
}

const hasPerks = (privileges: Privileges) => {
  return hasRank(privileges, Privileges.Perks)
}

export { hasRank, hasPerks, isStaff, isNominator, isQat }
