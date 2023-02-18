import { MdAccountCircle } from 'react-icons/md'

const BadgeOwner = () => {
  return (
    <div className="flex flex-row items-center justify-center bg-green-300 shadow-sm shadow-green-500 rounded-lg py-4 px-3 h-8">
      <MdAccountCircle className="mr-2" />
      Owner
    </div>
  )
}

export default BadgeOwner
