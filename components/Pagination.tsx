interface IProps {
  offset: number
  length: number
  previousPageFunction: () => 0 | undefined
  nextPageFunction: () => 0 | undefined
}

const Pagination = ({
  offset,
  length,
  previousPageFunction,
  nextPageFunction
}: IProps) => {
  return (
    <div className="flex justify-center mt-4">
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex">
          <li>
            <button
              className={
                offset === 0
                  ? 'pointer-events-none relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400'
                  : 'relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
              }
              onClick={previousPageFunction}
            >
              Previous
            </button>
          </li>
          <li>
            <button
              className={
                length < 50
                  ? 'pointer-effects-none relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400'
                  : 'relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
              }
              onClick={nextPageFunction}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
