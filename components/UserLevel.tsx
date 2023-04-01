import { LevelBadgeColor } from '../constants/Gradients'

interface IProps {
  level: number
  levelProgress: number
}

const UserLevel = ({ level, levelProgress }: IProps) => {
  const color = LevelBadgeColor(level)
  return (
    <div className="flex items-center justify-center w-16 h-16 select-none group">
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 86.6 100"
        className="w-16 h-16"
      >
        <defs>
          {/* Gradient #FFF to #000 */}
          <linearGradient
            id="level-gradient"
            x1="43.3"
            y1="0"
            x2="43.3"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={color[0]} />
            <stop offset="1" stopColor={color[1]} />
          </linearGradient>
        </defs>
        {/* TODO: Add path and change below to track to make hexagonal progress bar */}
        <path
          style={{ fill: `url(#level-gradient)` }}
          d="M43.3,8.45A17.3,17.3,0,0,1,52,10.77L73,22.89a17.35,17.35,0,0,1,8.64,15V62.13a17.35,17.35,0,0,1-8.64,15L52,89.23a17.29,17.29,0,0,1-17.3,0l-21-12.12A17.34,17.34,0,0,1,5,62.13V37.87a17.34,17.34,0,0,1,8.65-15l21-12.12A17.3,17.3,0,0,1,43.3,8.45m0-5a22.2,22.2,0,0,0-11.15,3l-21,12.12A22.31,22.31,0,0,0,0,37.87V62.13A22.31,22.31,0,0,0,11.15,81.44l21,12.12a22.28,22.28,0,0,0,22.3,0l21-12.12A22.32,22.32,0,0,0,86.6,62.13V37.87A22.32,22.32,0,0,0,75.46,18.56l-21-12.12a22.2,22.2,0,0,0-11.15-3Z"
        />
      </svg>
      {/* create absolute span, center it */}
      <span className="absolute text-xl font-medium text-white text-center -mb-0.5 group-hover:-translate-y-[80%] translate-y-0 group-hover:opacity-0 transition-all duration-300">
        {level}
      </span>
      <span className="absolute text-xl font-medium text-white text-center -mb-0.5 translate-y-[80%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {levelProgress}%
      </span>
    </div>
  )
}
export default UserLevel
