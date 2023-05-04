import classNames from 'classnames'
import { SetStateAction, useEffect, useState } from 'react'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger
} from './ui/HoverCard'

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
    const selectedGamemode = ModeStateMap[gamemode] || {}
    setStdSelected(!!selectedGamemode.std)
    setTaikoSelected(!!selectedGamemode.taiko)
    setCatchSelected(!!selectedGamemode.catch)
    setManiaSelected(!!selectedGamemode.mania)
  }, [gamemode])

  return (
    <div className="dark flex flex-row gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <button
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
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent
            side="bottom"
            className="inline-block w-48 bg-hsl-15 bg-opacity-80 shadow-sm shadow-hsl-5 rounded-lg font-light"
          >
            <div className="px-3 py-2">
              <h3 className="font-semibold text-gray-200 text-center">osu!</h3>
            </div>
            <div className="px-3 pb-2 flex flex-col items-center justify-between gap-2">
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
            <HoverCardArrow className="fill-hsl-15 opacity-80" />
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <button
            type="button"
            className={`px-3 py-2 text-white rounded duration-300 hover:bg-hsl-10 hover:bg-opacity-80 ${
              taikoSelected
                ? 'bg-hsl-55 bg-opacity-80 hover:bg-hsl-75 hover:bg-opacity-60'
                : 'bg-hsl-15 bg-opacity-60 hover:bg-hsl-10 hover:bg-opacity-80'
            }`}
            onClick={() => setGamemode(1)}
          >
            <i className="mode-icon taiko" />
          </button>
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent
            side="bottom"
            className="inline-block w-48 bg-hsl-15 bg-opacity-80 shadow-sm shadow-hsl-5 rounded-lg font-light"
          >
            <div className="px-3 py-2 ">
              <h3 className="font-semibold text-gray-200 text-center">
                osu!taiko
              </h3>
            </div>
            <div className="px-3 pb-2 flex flex-col items-center justify-between gap-2">
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
            <HoverCardArrow className="fill-hsl-15 opacity-80" />
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <button
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
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent
            side="bottom"
            className="inline-block w-48 bg-hsl-15 bg-opacity-80 shadow-sm shadow-hsl-5 rounded-lg font-light"
          >
            <div className="px-3 py-2 ">
              <h3 className="font-semibold text-gray-200 text-center">
                osu!catch
              </h3>
            </div>
            <div className="px-3 pb-2 flex flex-col items-center justify-between gap-2">
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
            <HoverCardArrow className="fill-hsl-15 opacity-80" />
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <button
            type="button"
            className={`px-3 py-2 text-white rounded duration-300  ${
              maniaSelected
                ? 'bg-hsl-55 bg-opacity-80 hover:bg-hsl-75 hover:bg-opacity-60'
                : 'bg-hsl-15 bg-opacity-60 hover:bg-hsl-10 hover:bg-opacity-80'
            }`}
            onClick={() => setGamemode(3)}
          >
            <i className="mode-icon mania" />
          </button>
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent
            side="bottom"
            className="inline-block w-48 bg-hsl-15 bg-opacity-80 shadow-sm shadow-hsl-5 rounded-lg font-light"
          >
            <div className="px-3 py-2 ">
              <h3 className="font-semibold text-gray-200 text-center">
                osu!mania
              </h3>
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
            <HoverCardArrow className="fill-hsl-15 opacity-80" />
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>
    </div>
  )
}

export default GamemodeSwitcher
