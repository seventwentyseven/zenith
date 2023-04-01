import classNames from 'classnames'

interface IProps {
  percent: number
  statDescription: string
}

const CircularProgress = ({ percent, statDescription }: IProps) => {
  let circumference = 50 * 2 * Math.PI
  return (
    <>
      {/* <div className="flex items-center flex-wrap px-10 mt-5 bg-hsl-15 bg-opacity-60 shadow-xl backdrop-blur-xl rounded-2xl h-20"> */}
      <div
        className={classNames(
          'flex items-center justify-center',
          // ' -m-6 ',
          'overflow-hidden',
          ' bg-hsl-15 bg-opacity-60 backdrop-blur-xl rounded-full -mt-3'
        )}
      >
        <svg
          className="w-32 h-32 transform translate-x-1 -translate-y-1 rotate-[270deg]"
          aria-hidden="true"
        >
          <linearGradient id="my-gradient">
            <stop offset="0%" stopColor="#97DCFF" />
            <stop offset="100%" stopColor="#ED82FF" />
          </linearGradient>
          <circle
            className="text-hsl-25"
            strokeWidth={10}
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
          />
          <circle
            strokeWidth={10}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percent / 100) * circumference}
            strokeLinecap="round"
            stroke="url(#my-gradient)"
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
          />
        </svg>
        <span
          className="absolute flex flex-col items-center justify-center whitespace-pre-wrap text-2xl bg-[#97DCFF] bg-gradient-to-b to-[#97DCFF] from-[#ED82FF] bg-clip-text"
          style={{
            WebkitTextFillColor: 'transparent'
          }}
        >
          {statDescription}
          {/* {percent === null ? '0' :  percent}% */}
        </span>
        {/* </div> */}
        {/* <p className="ml-10 font-medium text-white sm:text-xl">
          {statDescription}
        </p> */}
      </div>
    </>
  )
}

export default CircularProgress
