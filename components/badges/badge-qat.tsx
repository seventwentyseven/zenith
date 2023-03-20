import { MdShield } from 'react-icons/md'

const BadgeQAT = () => {
  return (
    <div className="flex flex-row items-center justify-center bg-gradient-to-br from-sky-600 to-cyan-400 rounded-lg py-4 px-3 h-8">
      <MdShield className="mr-2 text-rose-100 text-xl" />
      <span className="text-rose-100">Nomination Assessor</span>
    </div>
  )
}

export default BadgeQAT
