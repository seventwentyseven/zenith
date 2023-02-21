import { MdAccountCircle } from 'react-icons/md'

const BadgeOwner = () => {
  return (
    <div className="flex flex-row items-center justify-center bg-gradient-to-br from-rose-600 to-pink-500 rounded-lg py-4 px-3 h-8">
      <MdAccountCircle className="mr-2 text-rose-100 text-xl" />
      <span className="text-rose-100">Owner</span>
    </div>
  )
}

export default BadgeOwner
