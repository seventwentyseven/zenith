import { MdMusicNote } from 'react-icons/md'

const BadgeNominator = () => {
  return (
    <>
      <span
        className="inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-blue-600 to-sky-400 text-blue-100 group transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        role="alert"
        tabIndex={0}
      >
        <MdMusicNote className="text-xl" />
        <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2 group-focus:px-2">
          Nominator
        </span>
      </span>
    </>
  )
}

export default BadgeNominator
