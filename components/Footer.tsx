import React from 'react'

const footer = () => {
  return (
    <footer className="w-full bg-hsl-5 flex items-center">
      <div className="px-8 py-4 grid grid-cols-6 gap-2 grid-rows-1 text-white">
        <div className="col-span-1 row-span-1 flex flex-col">
          <div>
            <span className="text-2xl font-semibold text-hsl-80">ZENITH</span>
            <span className="ml-2">2.0.0a-dev</span>
          </div>
          <span>© 2023 Seven Twenty Seven</span>
        </div>
        <div className="col-span-1 row-span-1 flex flex-col">
          <p className="text-sm my-auto">
            Not affiliated with ppy Pty Ltd in any way. "osu!" is a trademark of
            ppy Pty Ltd.
          </p>
        </div>
        <div className="col-span-2"></div>
      </div>
    </footer>
  )
}

export default footer
