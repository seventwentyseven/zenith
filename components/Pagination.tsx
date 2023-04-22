interface IProps {
  offset: number
  length: number
  pageLength: number
  previousPageFunction: () => 0 | undefined
  nextPageFunction: () => 0 | undefined
}

const Pagination = ({
  offset,
  length,
  pageLength,
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
                  ? 'pointer-events-none relative block rounded bg-transparent py-1.5 px-3 text-sm transition-all duration-300 text-hsl-90'
                  : 'relative block rounded-full bg-transparent py-1.5 px-3 text-sm text-white transition-all duration-300 hover:bg-hsl-25'
              }
              onClick={previousPageFunction}
            >
              Previous
            </button>
          </li>
          <li>
            <button
              className={
                length < pageLength
                  ? 'pointer-effects-none relative block rounded bg-transparent py-1.5 px-3 text-sm transition-all duration-300 text-hsl-90'
                  : 'relative block rounded-full bg-transparent py-1.5 px-3 text-sm text-white transition-all duration-300 hover:bg-hsl-25'
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
