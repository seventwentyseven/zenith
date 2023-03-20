import { MdShield } from 'react-icons/md'

const BadgeAdmin = () => {
  return (
    <div className="flex flex-row items-center justify-center bg-gradient-to-br from-yellow-600 to-amber-400 rounded-lg py-4 px-3 h-8">
      <MdShield className="mr-2 text-rose-100 text-xl" />
      <span className="text-rose-100">Administrator</span>
    </div>
  )
}

export default BadgeAdmin
