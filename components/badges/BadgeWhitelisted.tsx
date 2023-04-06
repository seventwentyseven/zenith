import { FaUserCheck } from 'react-icons/fa'
import { Privileges } from '../../constants/Privileges'

interface IProps {
  priv: number
}

const BadgeWhitelisted = ({ priv }: IProps) => {
  let icon_array = []
  if (priv & Privileges.WhitelistedStdVn) {
    icon_array.push('mode-icon osu')
  }
  if (priv & Privileges.WhitelistedTaikoVn) {
    icon_array.push('mode-icon taiko')
  }
  if (priv & Privileges.WhitelistedCatchVn) {
    icon_array.push('mode-icon catch')
  }
  if (priv & Privileges.WhitelistedManiaVn) {
    icon_array.push('mode-icon mania')
  }
  if (priv & Privileges.WhitelistedStdRx) {
    icon_array.push('mode-icon osu text-pink-300')
  }
  if (priv & Privileges.WhitelistedTaikoRx) {
    icon_array.push('mode-icon taiko text-pink-300')
  }
  if (priv & Privileges.WhitelistedCatchRx) {
    icon_array.push('mode-icon catch text-pink-300')
  }
  if (priv & Privileges.WhitelistedStdAp) {
    icon_array.push('mode-icon osu text-blue-300')
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
            {/* display html from array */}
            {icon_array.map(icon => (
              <div key={icon} className={icon} />
            ))}
          </div>
        </div>
      </span>
    </>
  )
}

export default BadgeWhitelisted
