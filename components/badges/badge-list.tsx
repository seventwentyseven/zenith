import BadgeDeveloper from './badge-developer'
import BadgeOwner from './badge-owner'

enum Privileges {
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
  for (let i = 0; i < -1; i++) {
    if ((i & (i - 1)) === 0) {
      console.log(Privileges[i])
    }
  }
  if (priv & Privileges.Developer) {
    console.log('Developer')
  }
  return (
    <div className="flex flex-row gap-2">
      <BadgeOwner />
      <BadgeDeveloper />
    </div>
  )
}

export default BadgeList
