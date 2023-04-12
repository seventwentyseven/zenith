import { initDropdowns } from 'flowbite'
import { useEffect, useState } from 'react'
import { MdArrowDropDown, MdSearch } from 'react-icons/md'
import { search } from '../../controllers/SearchHandling'
import { Modal } from '../Modal'
import { useDebounce } from 'use-debounce'

const SearchCategories = {
  all: 'All categories',
  players: 'Players',
  beatmaps: 'Beatmaps'
}

const HeaderSearchModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [category, setCategory] = useState<'players' | 'beatmaps' | 'all'>(
    'players'
  )
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery] = useDebounce(query, 1000)

  useEffect(() => {
    initDropdowns()
  })

  useEffect(() => {
    if (debouncedQuery !== '') {
      search(debouncedQuery, category)
    }
  }, [debouncedQuery, category])

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-2xl">
        <MdSearch />
      </button>
      <Modal
        isOpen={isOpen}
        title="Search"
        description=""
        handleCancel={() => setIsOpen(false)}
      >
        <form>
          <div className="flex-col dark w-[960px]">
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
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
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
                className="inline-block p-2.5 w-[800px] z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search"
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            {debouncedQuery}
          </div>
        </form>
      </Modal>
    </>
  )
}

export default HeaderSearchModal
