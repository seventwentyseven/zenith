import HeaderLogo from './HeaderLogo'
import HeaderNavigation from './HeaderNavigation'
import HeaderRightBlock from './HeaderRightBlock'

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b border-hsl-20/40  bg-hsl-20 bg-opacity-40 backdrop-blur-xl z-10">
      <nav className="w-full max-w-screen-xl min-h-16 mx-auto grid grid-cols-3 grid-rows-1 my-auto py-1">
        <HeaderLogo />

        <HeaderNavigation />

        <HeaderRightBlock />
      </nav>
    </header>
  )
}

export default Header
