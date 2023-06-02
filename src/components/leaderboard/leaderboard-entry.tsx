import Link from 'next/link'
import { useContext } from 'react'
import { LeaderboardEntryContext } from '~/pages/leaderboard'

const LeaderboardPlayer = () => {
  const ctx = useContext(LeaderboardEntryContext)
  return (
    <tr>
      <th>{ctx.page * 50 + ctx.index + 1}</th>
      <td>
        <Link href={`/user/${ctx.entry.player_id}`}>{ctx.entry.name}</Link>
      </td>
      <td className="w-full text-center">{ctx.entry.acc.toFixed(2)}</td>
      <td className="w-full text-center">{ctx.entry.plays.toLocaleString()}</td>
      <td className="w-full text-center">
        {ctx.entry.max_combo.toLocaleString()}
      </td>
      <td className="w-full text-center">{ctx.entry.pp.toLocaleString()}</td>
    </tr>
  )
}

export default LeaderboardPlayer
