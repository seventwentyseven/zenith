import { MdCode } from 'react-icons/md'

const BadgeDeveloper = () => {
  return (
    <div className="flex flex-row items-center justify-center bg-gradient-to-br from-purple-700 to-fuchsia-700 rounded-lg py-4 px-3 h-8">
      <MdCode className="mr-2 text-rose-100 text-xl" />
      <span className="text-rose-100">Dev</span>
    </div>
  )
}

export default BadgeDeveloper
