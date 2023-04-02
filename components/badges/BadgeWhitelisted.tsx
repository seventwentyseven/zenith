// const BadgeWhitelisted = () => {
//   return (
//     <>
//       <span
//         className="v inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-green-400 to-green-500 text-green-100 group transition-all duration-300"
//         role="alert"
//         tabIndex={0}
//       >
//         <FaUserCheck className="text-xl" />
//         <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2">
//           Verified
//         </span>
//       </span>
//     </>
//   )
// }

// export default BadgeWhitelisted

import { FaUserCheck } from 'react-icons/fa'
import { Privileges } from '../../constants/Privileges'

interface IProps {
  priv: number
}

const BadgeWhitelisted = ({ priv }: IProps) => {
  let icon_array = []
  if (priv & Privileges.WhitelistedStd) {
    icon_array.push('osu')
  }
  if (priv & Privileges.WhitelistedTaiko) {
    icon_array.push('taiko')
  }
  if (priv & Privileges.WhitelistedCatch) {
    icon_array.push('catch')
  }
  if (priv & Privileges.WhitelistedMania) {
    icon_array.push('mania')
  }

  return (
    <>
      <span
        className="select-none inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-green-400 to-green-500 text-green-100 group transition-all duration-300"
        role="alert"
        tabIndex={0}
      >
        <FaUserCheck className="text-xl" />
        <div className="whitespace-nowrap group-hover:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2 flex gap-2">
          <span>Verified</span>
          <div className="flex flex-row gap-1">
            {icon_array.map(icon => (
              <i className={`mode-icon ${icon}`}></i>
            ))}
          </div>
        </div>
      </span>
    </>
  )
}

export default BadgeWhitelisted
