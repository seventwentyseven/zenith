import { MdOutlineShield } from 'react-icons/md'

const BadgeModerator = () => {
  return (
    <div className="flex flex-row items-center justify-center bg-gradient-to-br from-green-700 to-emerald-500 rounded-lg py-4 px-3 h-8">
      <MdOutlineShield className="mr-2 text-rose-100 text-xl" />
      <span className="text-rose-100">Moderator</span>
    </div>
  )
}

export default BadgeModerator
