import { initPopovers } from 'flowbite'
import { SetStateAction, useEffect } from 'react'

interface IProps {
  setGameMode: React.Dispatch<SetStateAction<number>>
}

const GamemodeSwitcher = ({ setGameMode }: IProps) => {
  useEffect(() => {
    initPopovers()
  })

  return (
    <div className="dark flex flex-row gap-2">
      <button
        data-popover-target="popover-std"
        data-popover-placement="bottom"
        type="button"
        className="px-3 py-2 bg-hsl-15 bg-opacity-60 text-white rounded duration-300 hover:bg-hsl-10 hover:bg-opacity-80"
        onClick={() => setGameMode(0)}
      >
        <i className="mode-icon osu"></i>
      </button>

      <button
        data-popover-target="popover-taiko"
        data-popover-placement="bottom"
        type="button"
        className="px-3 py-2 bg-hsl-15 bg-opacity-60 text-white rounded duration-300 hover:bg-hsl-10 hover:bg-opacity-80"
        onClick={() => setGameMode(1)}
      >
        <i className="mode-icon taiko"></i>
      </button>
      <button
        data-popover-target="popover-catch"
        data-popover-placement="bottom"
        type="button"
        className="px-3 py-2 bg-hsl-15 bg-opacity-60 text-white rounded duration-300 hover:bg-hsl-10 hover:bg-opacity-80"
        onClick={() => setGameMode(2)}
      >
        <i className="mode-icon catch"></i>
      </button>
      <button
        data-popover-target="popover-mania"
        data-popover-placement="bottom"
        type="button"
        className="px-3 py-2 bg-hsl-15 bg-opacity-60 text-white rounded duration-300 hover:bg-hsl-10 hover:bg-opacity-80"
        onClick={() => setGameMode(3)}
      >
        <i className="mode-icon mania"></i>
      </button>

      <div
        data-popover
        id="popover-std"
        role="tooltip"
        className="absolute z-10 invisible inline-block w-48 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
      >
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white text-center">
            osu!
          </h3>
        </div>
        <div className="px-3 py-2 flex flex-col items-center justify-between gap-2">
          <button
            className="btn btn-md btn-primary w-full"
            onClick={() => setGameMode(0)}
          >
            vanilla
          </button>
          <button
            className="btn btn-md btn-primary w-full"
            onClick={() => setGameMode(4)}
          >
            relax
          </button>
          <button
            className="btn btn-md btn-primary w-full"
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
            className="btn btn-md btn-primary w-full"
            onClick={() => setGameMode(1)}
          >
            vanilla
          </button>
          <button
            className="btn btn-md btn-primary w-full"
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
            className="btn btn-md btn-primary w-full"
            onClick={() => setGameMode(2)}
          >
            vanilla
          </button>
          <button
            className="btn btn-md btn-primary w-full"
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
        className="absolute z-10 invisible inline-block w-48 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
      >
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white text-center">
            osu!mania
          </h3>
        </div>
        <div className="px-3 py-2 flex flex-col items-center justify-between gap-2">
          <button
            className="btn btn-md btn-primary w-full"
            onClick={() => setGameMode(3)}
          >
            vanilla
          </button>
        </div>
        <div data-popper-arrow></div>
      </div>
    </div>
  )
}

export default GamemodeSwitcher
