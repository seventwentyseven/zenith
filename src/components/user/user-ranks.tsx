import UserCountryRank from './user-country-rank'
import UserGlobalRank from './user-global-rank'

const UserRanks = () => {
  return (
    <div className="mr-8 flex gap-14">
      <UserGlobalRank />
      <UserCountryRank />
    </div>
  )
}

export default UserRanks
