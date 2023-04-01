import { FaMusic } from 'react-icons/fa'
import { Privileges } from '../../constants/Privileges'

interface IProps {
  priv: number
}

const BadgeQAT = ({ priv }: IProps) => {
  let icon_array = []
  if (priv & Privileges.QatStd) {
    icon_array.push('osu')
  }
  if (priv & Privileges.QatTaiko) {
    icon_array.push('taiko')
  }
  if (priv & Privileges.QatCatch) {
    icon_array.push('catch')
  }
  if (priv & Privileges.QatMania) {
    icon_array.push('mania')
  }

  return (
    <>
      <span
        className="select-none inline-flex items-center rounded-full px-2.5 py-2 bg-gradient-to-br from-sky-600 to-cyan-400 text-blue-100 group transition-all duration-300"
        role="alert"
        tabIndex={0}
      >
        <FaMusic className="text-xl" />
        <div className="whitespace-nowrap group-hover:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2 flex gap-2">
          <span>Quality Assesor</span>
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

export default BadgeQAT
