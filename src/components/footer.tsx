import { AiFillGithub } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className="flex w-full flex-row gap-6 bg-hsl-35-15 px-8 py-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-end gap-2">
          <span className="text-base-content-secondary text-3xl font-semibold">
            Zenith
          </span>
          <span className="mb-0.5">v. 3.0.0a-dev</span>
        </div>
        <div>&copy; Seven Twenty Seven 2023</div>
      </div>
      <div className="my-auto text-sm">
        Not affiliated with ppy Pty Ltd in any way. &quot;osu!&quot; is a
        trademark of ppy Pty Ltd.
      </div>
      <div className="ml-auto grid grid-cols-2 justify-items-end gap-2">
        <AiFillGithub className="text-2xl" />
        <span>GitHub</span>
      </div>
    </footer>
  )
}

export default Footer
