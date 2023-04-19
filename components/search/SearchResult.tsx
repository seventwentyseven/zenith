import { ReactNode } from 'react'

const SearchResult = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-row items-center justify-start w-full rounded-xl bg-hsl-20 p-4 my-4'>{children}</div>
}

export default SearchResult
