import { ImHammer2 } from 'react-icons/im'

const BadgeAdmin = () => {
  return (
    <>
      <span
        className="inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-yellow-600 to-amber-400 text-yellow-100 group transition-all duration-300 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
        role="alert"
        tabIndex={0}
      >
        <ImHammer2 className="text-xl" />
        <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2 group-focus:px-2">
          Administrator
        </span>
      </span>
    </>
  )
}

export default BadgeAdmin
