import classNames from 'classnames'
import { initPopovers } from 'flowbite'
import { SetStateAction, useEffect, useState } from 'react'

interface IProps {
  gamemode: number
  setGamemode: React.Dispatch<SetStateAction<number>>
}

interface IModeState {
  std: boolean
  taiko: boolean
  catch: boolean
  mania: boolean
}

interface IModeStateMap {
  [key: number]: IModeState
}

const ModeStateMap: IModeStateMap = {
  0: { std: true, taiko: false, catch: false, mania: false },
  1: { std: false, taiko: true, catch: false, mania: false },
  2: { std: false, taiko: false, catch: true, mania: false },
  3: { std: false, taiko: false, catch: false, mania: true },
  4: { std: true, taiko: false, catch: false, mania: false },
  5: { std: false, taiko: true, catch: false, mania: false },
  6: { std: false, taiko: false, catch: true, mania: false },
  8: { std: true, taiko: false, catch: false, mania: false }
}

const GamemodeSwitcher = ({ gamemode, setGamemode }: IProps) => {
  const [stdSelected, setStdSelected] = useState<boolean>(false)
  const [taikoSelected, setTaikoSelected] = useState<boolean>(false)
  const [catchSelected, setCatchSelected] = useState<boolean>(false)
  const [maniaSelected, setManiaSelected] = useState<boolean>(false)

  useEffect(() => {
    initPopovers()
  })

  useEffect(() => {
    const selectedGamemode = ModeStateMap[gamemode] || {}
    setStdSelected(!!selectedGamemode.std)
    setTaikoSelected(!!selectedGamemode.taiko)
    setCatchSelected(!!selectedGamemode.catch)
    setManiaSelected(!!selectedGamemode.mania)
  }, [gamemode])

  return (
    <div className="dark flex flex-row gap-2">
      <button
        data-popover-target="popover-std"
        data-popover-placement="bottom"
        type="button"
        className={`px-3 py-2 text-white rounded duration-300 hover:bg-hsl-10 hover:bg-opacity-80 ${
          stdSelected
            ? 'bg-hsl-55 bg-opacity-80 hover:bg-hsl-75 hover:bg-opacity-60'
            : 'bg-hsl-15 bg-opacity-60 hover:bg-hsl-10 hover:bg-opacity-80'
        }`}
        onClick={() => setGamemode(0)}
      >
        <i className="mode-icon osu"></i>
      </button>

      <button
        data-popover-target="popover-taiko"
        data-popover-placement="bottom"
        type="button"
        className={`px-3 py-2 text-white rounded duration-300 hover:bg-hsl-10 hover:bg-opacity-80 ${
          taikoSelected
            ? 'bg-hsl-55 bg-opacity-80 hover:bg-hsl-75 hover:bg-opacity-60'
            : 'bg-hsl-15 bg-opacity-60 hover:bg-hsl-10 hover:bg-opacity-80'
        }`}
        onClick={() => setGamemode(1)}
      >
        <i className="mode-icon taiko"></i>
      </button>
      <button
        data-popover-target="popover-catch"
        data-popover-placement="bottom"
        type="button"
        className={`px-3 py-2 text-white rounded duration-300 hover:bg-hsl-10 hover:bg-opacity-80 ${
          catchSelected
            ? 'bg-hsl-55 bg-opacity-80 hover:bg-hsl-75 hover:bg-opacity-60'
            : 'bg-hsl-15 bg-opacity-60 hover:bg-hsl-10 hover:bg-opacity-80'
        }`}
        onClick={() => setGamemode(2)}
      >
        <i className="mode-icon catch"></i>
      </button>
      <button
        data-popover-target="popover-mania"
        data-popover-placement="bottom"
        type="button"
        className={`px-3 py-2 text-white rounded duration-300  ${
          maniaSelected
            ? 'bg-hsl-55 bg-opacity-80 hover:bg-hsl-75 hover:bg-opacity-60'
            : 'bg-hsl-15 bg-opacity-60 hover:bg-hsl-10 hover:bg-opacity-80'
        }`}
        onClick={() => setGamemode(3)}
      >
        <i className="mode-icon mania"></i>
      </button>

      <div
        data-popover
        id="popover-std"
        role="tooltip"
        className={classNames(
          'absolute z-10 invisible inline-block w-48 text-sm font-light text-gray-500',
          'transition-opacity duration-300 bg-white border border-gray-200 rounded-lg',
          'shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800'
        )}
      >
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white text-center">
            osu!
          </h3>
        </div>
        <div className="px-3 py-2 flex flex-col items-center justify-between gap-2">
          <button
            className={classNames(
              'btn btn-md',
              gamemode === 0 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGamemode(0)}
          >
            vanilla
          </button>
          <button
            className={classNames(
              'btn btn-md',
              gamemode === 4 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGamemode(4)}
          >
            relax
          </button>
          <button
            className={classNames(
              'btn btn-md',
              gamemode === 8 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGamemode(8)}
          >
            autopilot
          </button>
        </div>
        <div data-popper-arrow></div>
      </div>

      <div
        data-popover
        id="popover-taiko"
        role="tooltip"
        className="absolute z-10 invisible inline-block w-48 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
      >
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white text-center">
            osu!taiko
          </h3>
        </div>
        <div className="px-3 py-2 flex flex-col items-center justify-between gap-2">
          <button
            className={classNames(
              'btn btn-md',
              gamemode === 1 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGamemode(1)}
          >
            vanilla
          </button>
          <button
            className={classNames(
              'btn btn-md',
              gamemode === 5 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGamemode(5)}
          >
            relax
          </button>
        </div>
        <div data-popper-arrow></div>
      </div>

      <div
        data-popover
        id="popover-catch"
        role="tooltip"
        className="absolute z-10 invisible inline-block w-48 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
      >
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white text-center">
            osu!catch
          </h3>
        </div>
        <div className="px-3 py-2 flex flex-col items-center justify-between gap-2">
          <button
            className={classNames(
              'btn btn-md',
              gamemode === 2 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGamemode(2)}
          >
            vanilla
          </button>
          <button
            className={classNames(
              'btn btn-md',
              gamemode === 6 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGamemode(6)}
          >
            relax
          </button>
        </div>
        <div data-popper-arrow></div>
      </div>

      <div
        data-popover
        id="popover-mania"
        role="tooltip"
        className="absolute z-10 invisible inline-block w-48 text-sm font-light transition-opacity duration-300 rounded-lg shadow-sm shadow-hsl-5 bg-hsl-15 bg-opacity-75 opacity-0"
      >
        <div className="px-3 py-2 ">
          <h3 className="font-semibold text-gray-200 text-center">osu!mania</h3>
        </div>
        <div className="px-3 pb-2 flex flex-col items-center justify-between gap-2">
          <button
            className={classNames(
              'btn btn-md',
              gamemode === 3 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGamemode(3)}
          >
            Vanilla
          </button>
        </div>
        <div data-popper-arrow></div>
      </div>
    </div>
  )
}

export default GamemodeSwitcher
