import { ReactNode } from 'react'

const SearchResult = ({
  children,
  backgroundImageUrl
}: {
  children: ReactNode
  backgroundImageUrl: string
}) => {
  return (
    <div
      className="flex flex-row items-center justify-start w-full rounded-xl bg-hsl-20 p-4"
      style={{
        background: `url(${backgroundImageUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {children}
    </div>
  )
}

export default SearchResult
