import { initDropdowns } from 'flowbite'
import { useEffect, useState } from 'react'
import { MdArrowDropDown, MdSearch } from 'react-icons/md'
import { search } from '../../controllers/SearchHandling'
import { Modal } from '../Modal'
import { useDebounce } from 'use-debounce'
import { User } from 'next-auth'
import { ISearchResponse } from '../../types/Search'
import SearchResult from '../search/SearchResult'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'

const SearchCategories = {
  all: 'All categories',
  players: 'Players',
  beatmaps: 'Beatmaps'
}

const HeaderSearchModal = ({ token }: { token: User['token'] }) => {
  const [category, setCategory] = useState<'players' | 'beatmaps' | 'all'>(
    'players'
  )
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery] = useDebounce(query, 1000)
  const [offset, setOffset] = useState<number>(0)
  const [data, setData] = useState<ISearchResponse>()

  useEffect(() => {
    initDropdowns()
  })

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery !== '') {
        setData(await search(debouncedQuery, category, token, offset))
      }
    }
    fetchData()
  }, [debouncedQuery, category, offset, token])

  return (
    <Modal
      triggerElement={
        <button className="rounded-full text-2xl p-4 hover:bg-hsl-15 hover:bg-opacity-40">
          <MdSearch />
        </button>
      }
      title="Search"
      description="Search for what you want: players, beatmaps, or both at the same time. The world is your oyster."
    >
      <form>
        <div className="flex-col dark w-full">
          <div className="flex-row whitespace-nowrap w-full">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className="w-38 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
            >
              {SearchCategories[category]}
              <MdArrowDropDown className="text-lg ml-1" />
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setCategory('all')}
                  >
                    All categories
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setCategory('players')}
                  >
                    Players
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setCategory('beatmaps')}
                  >
                    Beatmaps
                  </button>
                </li>
              </ul>
            </div>
            <input
              type="search"
              id="search-dropdown"
              className="inline-block p-2.5 w-[calc(100%-6.75rem)] z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search"
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
      </form>
      {data?.data.players?.map((player, index) => {
        return (
          <Dialog.Close asChild key={`search-player-${index}`}>
            <Link href={`/user/${player.id}`}>
              <SearchResult backgroundImageUrl={`https://seventwentyseven.xyz/banners/${player.id}`}>
                <button>{player.name}</button>
              </SearchResult>
            </Link>
          </Dialog.Close>
        )
      })}
      <hr />
      {data?.data.beatmaps?.map((beatmap, index) => {
        return (
          <Dialog.Close asChild key={`search-beatmap-${index}`} >
            <Link href={`/beatmap/${beatmap.set_id}`}>
              <SearchResult backgroundImageUrl={`https://assets.ppy.sh/beatmaps/${beatmap.set_id}/covers/cover.jpg`}>
                <button>{beatmap.artist} - {beatmap.title}</button>
              </SearchResult>
            </Link>
          </Dialog.Close>
        )
      })}
      <button onClick={() => setOffset(offset + 5)}>more ppl</button>
    </Modal>
  )
}

export default HeaderSearchModal
