import { HTMLAttributes, ReactNode } from 'react'

interface IProps {
  title: ReactNode | string
  description: string
  bottomBlock: ReactNode | string
  callToAction: ReactNode | string
  topBlock?: ReactNode | string
  className?: HTMLAttributes<HTMLDivElement>
}

const Card = ({
  title,
  description,
  bottomBlock,
  callToAction,
  topBlock,
  className
}: IProps) => {
  return (
    <div
      className={`flex justify-center mt-4 border-px border-white/20 rounded-lg ${className}`}
    >
      <div className="block rounded-lg shadow-lg bg-hsl-15 bg-opacity-20 backdrop-blur-xl text-center">
        {topBlock && (
          <div className="border-b border-gray-300 text-white rounded-t-lg">
            {topBlock}
          </div>
        )}
        <div className="p-6">
          {title}
          <p className="text-white/70 text-base mb-4">{description}</p>
          {callToAction}
        </div>
        <div className="py-3 px-6 border-t border-gray-300">{bottomBlock}</div>
      </div>
    </div>
  )
}

export default Card
