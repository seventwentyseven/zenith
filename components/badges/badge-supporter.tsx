import { FaHeart } from 'react-icons/fa'

// TODO: Change icon depending on how many months the user has been a supporter (not counting unpaid months)
const BadgeSupporter = () => {
  return (
    <>
      <span
        className="inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-pink-400 to-pink-500 text-pink-100 group transition-all duration-300"
        role="alert"
        tabIndex={0}
      >
        <FaHeart className="text-xl" />
        <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2">
          Supporter
        </span>
      </span>
    </>
  )
}

export default BadgeSupporter
