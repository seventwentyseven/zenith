import BadgeAdmin from './badge-admin'
import BadgeDeveloper from './badge-developer'
import BadgeModerator from './badge-moderator'
import BadgeNominator from './badge-nominator'
import BadgeOwner from './badge-owner'
// import BadgeQAT from './badge-qat'

export enum Privileges {
  Unrestricted = 1 << 0,
  Verified = 1 << 1,
  Whitelisted = 1 << 2,
  Supporter = 1 << 4,
  Premium = 1 << 5,
  Alumni = 1 << 7,
  TournamentManager = 1 << 10,
  Nominator = 1 << 11,
  Moderator = 1 << 12,
  Administrator = 1 << 13,
  Developer = 1 << 14,

  Donator = Supporter | Premium,
  Perks = Supporter |
    Premium |
    Alumni |
    Nominator |
    Moderator |
    Administrator |
    Developer,
  Staff = Moderator | Administrator | Developer
}

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

  console.log(userPrivilegesArray)

  return (
    <div className="flex flex-row gap-2 max-w-2xl flex-wrap">
      {priv === 31751 ? <BadgeOwner /> : ''}
      {priv & Privileges.Developer ? <BadgeDeveloper /> : ''}
      {priv & Privileges.Administrator ? <BadgeAdmin /> : ''}
      {/* If User is an Owner or an Administrator, do not show Moderator badge */}
      {priv & Privileges.Moderator ? (
        priv === 31751 || priv & Privileges.Administrator ? (
          ''
        ) : (
          <BadgeModerator />
        )
      ) : (
        ''
      )}
      {priv & Privileges.Nominator ? <BadgeNominator /> : ''}
      {/* <BadgeQAT /> */}
    </div>
  )
}

export default BadgeList
