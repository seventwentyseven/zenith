import BadgeDeveloper from './badge-developer'
import BadgeOwner from './badge-owner'
import BadgeHeadAdmin from './badge-headadmin'
import BadgeAdmin from './badge-admin'
import BadgeCommunityManager from './badge-community_manager'
import BadgeModerator from './badge-moderator'
import BadgeQAT from './badge-qat'
import BadgeNominator from './badge-nominator'
import BadgeAlumni from './badge-alumni'
import BadgeSupporter from './badge-supporter'
import BadgeWhitelisted from './badge-whitelisted'
import BadgeFrozen from './badge-frozen'
import BadgeRestricted from './badge-restricted'

import { Privileges } from '../../constants/privileges'

interface IProps {
  priv: number
}

const BadgeList = ({ priv }: IProps) => {
  console.log(priv)

  let userPrivilegesArray: String[] = []

  // This is for checking what roles the User has, it is quite useless as it only logs in the server console
  for (const privilege in Privileges) {
    if (isNaN(Number(privilege))) {
      const privilegeValue = Privileges[privilege]
      if (
        typeof privilegeValue === 'number' &&
        (priv & privilegeValue) === privilegeValue
        // &&
        // privilegeValue !== Privileges.Staff
      ) {
        userPrivilegesArray.push(Privileges[privilegeValue])
      }
    }
  }
  return (
    <div className="flex flex-row gap-2 max-w-3xl flex-wrap">
      {priv & Privileges.OWNER ? <BadgeOwner /> : null}
      {priv & Privileges.DEVELOPER ? <BadgeDeveloper /> : null}
      {priv & Privileges.HEADADMIN ? (
        <BadgeHeadAdmin />
      ) : priv & Privileges.ADMINISTRATOR ? (
        <BadgeAdmin />
      ) : priv & Privileges.MODERATOR ? (
        <BadgeModerator />
      ) : null}
      {priv & Privileges.COMMUNITY_MANAGER ? <BadgeCommunityManager /> : null}
      {/* TODO: Mutually exclusive if same */}
      {priv & Privileges.QATS ? <BadgeQAT priv={priv} /> : null}
      {priv & Privileges.NOMINATORS ? <BadgeNominator priv={priv} /> : null}

      {priv & Privileges.ALUMNI ? <BadgeAlumni /> : null}
      {priv & Privileges.SUPPORTER ? <BadgeSupporter /> : null}
      {/* Show whitelisted only if user has the Whitelisted Privileges and does not have any of staff privileges */}
      {priv & Privileges.WHITELISTED &&
      !(priv & Privileges.STAFF) &&
      !(priv & Privileges.NOMINATORS) &&
      !Privileges.QATS ? (
        <BadgeWhitelisted />
      ) : null}
      {priv & Privileges.FROZEN ? <BadgeFrozen /> : null}
      {!(priv & Privileges.UNRESTRICTED) ? <BadgeRestricted /> : null}
    </div>
  )
}

export default BadgeList
