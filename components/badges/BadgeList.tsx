import BadgeDeveloper from './BadgeDeveloper'
import BadgeOwner from './BadgeOwner'
import BadgeHeadAdmin from './BadgeHeadAdmin'
import BadgeAdmin from './BadgeAdmin'
import BadgeCommunityManager from './BadgeCommunityManager'
import BadgeModerator from './BadgeModerator'
import BadgeQAT from './BadgeQAT'
import BadgeNominator from './BadgeNominator'
import BadgeAlumni from './BadgeAlumni'
import BadgeSupporter from './BadgeSupporter'
import BadgeWhitelisted from './BadgeWhitelisted'
import BadgeFrozen from './BadgeFrozen'
import BadgeRestricted from './BadgeRestricted'

import { Privileges } from '../../constants/Privileges'

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
      {priv & Privileges.Owner ? <BadgeOwner /> : null}
      {priv & Privileges.Developer ? <BadgeDeveloper /> : null}
      {priv & Privileges.HeadAdmin ? (
        <BadgeHeadAdmin />
      ) : priv & Privileges.Administrator ? (
        <BadgeAdmin />
      ) : priv & Privileges.Moderator ? (
        <BadgeModerator />
      ) : null}
      {priv & Privileges.CommunityManager ? <BadgeCommunityManager /> : null}
      {/* TODO: Mutually exclusive if same */}
      {priv & Privileges.Qats ? <BadgeQAT priv={priv} /> : null}
      {priv & Privileges.Nominators ? <BadgeNominator priv={priv} /> : null}

      {priv & Privileges.Alumni ? <BadgeAlumni /> : null}
      {priv & Privileges.Supporter ? <BadgeSupporter /> : null}
      {/* Show whitelisted only if user has the Whitelisted Privileges and does not have any of staff privileges */}
      {priv & Privileges.Whitelisted &&
      !(priv & Privileges.Staff) &&
      !(priv & Privileges.Nominators) &&
      !Privileges.Qats ? (
        <BadgeWhitelisted />
      ) : null}
      {priv & Privileges.Frozen ? <BadgeFrozen /> : null}
      {!(priv & Privileges.Unrestricted) ? <BadgeRestricted /> : null}
    </div>
  )
}

export default BadgeList
