import { FaRegSnowflake } from 'react-icons/fa'

const BadgeFrozen = () => {
  return (
    <>
      <span
        className="inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-blue-200 to-gray-200 text-black group transition-all duration-300"
        role="alert"
        tabIndex={0}
      >
        <FaRegSnowflake className="text-xl" />
        <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2">
          Frozen
        </span>
      </span>
    </>
  )
}

export default BadgeFrozen
