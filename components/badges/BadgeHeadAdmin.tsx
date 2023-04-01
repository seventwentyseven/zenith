import { FaUserTie } from 'react-icons/fa'

const BadgeHeadAdmin = () => {
  return (
    <>
      <span
        className="select-none inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-red-500 to-red-700 text-red-100 group transition-all duration-300"
        role="alert"
        tabIndex={0}
      >
        <FaUserTie className="text-xl" />
        <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2">
          Head Administrator
        </span>
      </span>
    </>
  )
}

export default BadgeHeadAdmin
