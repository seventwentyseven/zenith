import { MdCode } from 'react-icons/md'

const BadgeDeveloper = () => {
  return (
    <div className="flex flex-row items-center justify-center bg-purple-300 shadow-sm shadow-purple-500 rounded-lg py-4 px-3 h-8">
      <MdCode className="mr-2" />
      Dev
    </div>
  )
}

export default BadgeDeveloper
