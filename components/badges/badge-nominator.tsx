import { MdShield } from 'react-icons/md'

const BadgeAdmin = () => {
  return (
    <div className="flex flex-row items-center justify-center bg-gradient-to-br from-blue-600 to-sky-400 rounded-lg py-4 px-3 h-8">
      <MdShield className="mr-2 text-rose-100 text-xl" />
      <span className="text-rose-100">Admin</span>
    </div>
  )
}

export default BadgeAdmin
