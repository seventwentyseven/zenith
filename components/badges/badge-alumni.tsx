import { FaWheelchair } from 'react-icons/fa'

const BadgeAlumni = () => {
  return (
    <>
      <span
        className="inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-gray-400 to-gray-500 text-black group transition-all duration-300"
        role="alert"
        tabIndex={0}
      >
        <FaWheelchair className="text-xl" />
        <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2">
          Alumni
        </span>
      </span>
    </>
  )
}

export default BadgeAlumni
