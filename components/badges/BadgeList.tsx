import { Privileges } from '../../constants/Privileges'
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

const badges = [
  { privilege: Privileges.Owner, component: BadgeOwner },
  { privilege: Privileges.Developer, component: BadgeDeveloper },
  { privilege: Privileges.HeadAdmin, component: BadgeHeadAdmin },
  { privilege: Privileges.Administrator, component: BadgeAdmin },
  { privilege: Privileges.Moderator, component: BadgeModerator },
  { privilege: Privileges.CommunityManager, component: BadgeCommunityManager },
  { privilege: Privileges.Qats, component: BadgeQAT },
  { privilege: Privileges.Nominators, component: BadgeNominator },
  { privilege: Privileges.Alumni, component: BadgeAlumni },
  { privilege: Privileges.Supporter, component: BadgeSupporter },
  { privilege: Privileges.Whitelisted, component: BadgeWhitelisted },
  { privilege: Privileges.Frozen, component: BadgeFrozen }
]

interface IProps {
  priv: number
}

const BadgeList = ({ priv }: IProps) => {
  let userBadges = badges.filter(
    ({ privilege }) => (priv & privilege) === privilege
  )

  if (!(priv & Privileges.Unrestricted))
    userBadges.push({
      privilege: Privileges.Unrestricted,
      component: BadgeRestricted
    })
  return (
    <div className="flex flex-row gap-2 max-w-3xl flex-wrap">
      {userBadges.map(({ component: BadgeComponent }) => (
        <BadgeComponent key={BadgeComponent.name} priv={priv} />
      ))}
    </div>
  )
}

export default BadgeList
