import { Privileges } from '../components/badges/badge-list'

const hasAnyPrivilege = (
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
  return hasAnyPrivilege(privileges, Privileges.Staff)
}

export { hasAnyPrivilege, isStaff }
