import React, { ReactNode } from 'react'

type Props = {
  title: string
  figure: ReactNode
  value: ReactNode | string
  description?: string
}

const Stat = (props: Props) => {
  return (
    <div>
      <div className="stat">
        <div className="stat-figure text-secondary">{props.figure}</div>
        <div className="stat-title">{props.title}</div>
        <div className="stat-value text-2xl lg:text-3xl xl:text-4xl">
          {props.value}
        </div>

        {props.description && (
          <div className="stat-desc">{props.description}</div>
        )}
      </div>
    </div>
  )
}

export default Stat
