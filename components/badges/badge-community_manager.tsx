import { FaUsers } from 'react-icons/fa'

const BadgeCommunityManager = () => {
  return (
    <>
      <span
        className="inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-blue-500 to-sky-700 text-blue-100 group transition-all duration-300"
        role="alert"
        tabIndex={0}
      >
        <FaUsers className="text-xl" />
        <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2">
          Community Manager
        </span>
      </span>
    </>
  )
}

export default BadgeCommunityManager
