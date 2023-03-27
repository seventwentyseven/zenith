import { FaUserCheck } from 'react-icons/fa'

const BadgeVerified = () => {
  return (
    <>
      <span
        className="inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-green-400 to-green-500 text-green-100 group transition-all duration-300"
        role="alert"
        tabIndex={0}
      >
        <FaUserCheck className="text-xl" />
        <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2">
          Verified
        </span>
      </span>
    </>
  )
}

export default BadgeVerified
