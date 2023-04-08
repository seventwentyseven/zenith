import classNames from 'classnames'
import { initPopovers } from 'flowbite'
import { SetStateAction, useEffect, useState } from 'react'

interface IProps {
  gameMode: number
  setGameMode: React.Dispatch<SetStateAction<number>>
}

const GamemodeSwitcher = ({ gameMode, setGameMode }: IProps) => {
  const [stdSelected, setStdSelected] = useState<boolean>(false)
  const [taikoSelected, setTaikoSelected] = useState<boolean>(false)
  const [catchSelected, setCatchSelected] = useState<boolean>(false)
  const [maniaSelected, setManiaSelected] = useState<boolean>(false)
  useEffect(() => {
    initPopovers()
  })

  //! Please, for the love of God, do NOT look at the useEffect below.
  useEffect(() => {
    if (gameMode === 0 || gameMode === 4 || gameMode === 8) {
      setStdSelected(true)
      setTaikoSelected(false)
      setCatchSelected(false)
      setManiaSelected(false)
    } else if (gameMode === 1 || gameMode === 5) {
      setStdSelected(false)
      setTaikoSelected(true)
      setCatchSelected(false)
      setManiaSelected(false)
    } else if (gameMode === 2 || gameMode === 6) {
      setStdSelected(false)
      setTaikoSelected(false)
      setCatchSelected(true)
      setManiaSelected(false)
    } else if (gameMode === 3) {
      setStdSelected(false)
      setTaikoSelected(false)
      setCatchSelected(false)
      setManiaSelected(true)
    } else {
      // Invalid game mode, reset all state variables to false
      setStdSelected(false)
      setTaikoSelected(false)
      setCatchSelected(false)
      setManiaSelected(false)
    }
  }, [gameMode])

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
        onClick={() => setGameMode(0)}
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
        onClick={() => setGameMode(1)}
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
        onClick={() => setGameMode(2)}
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
        onClick={() => setGameMode(3)}
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
              gameMode === 0 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGameMode(0)}
          >
            vanilla
          </button>
          <button
            className={classNames(
              'btn btn-md',
              gameMode === 4 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGameMode(4)}
          >
            relax
          </button>
          <button
            className={classNames(
              'btn btn-md',
              gameMode === 8 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGameMode(8)}
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
              gameMode === 1 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGameMode(1)}
          >
            vanilla
          </button>
          <button
            className={classNames(
              'btn btn-md',
              gameMode === 5 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGameMode(5)}
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
              gameMode === 2 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGameMode(2)}
          >
            vanilla
          </button>
          <button
            className={classNames(
              'btn btn-md',
              gameMode === 6 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGameMode(6)}
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
              gameMode === 3 ? 'btn-secondary' : 'btn-primary',
              'w-full'
            )}
            onClick={() => setGameMode(3)}
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
