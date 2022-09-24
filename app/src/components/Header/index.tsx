import { Link } from 'wouter'
import { useUserConnected } from '../../hooks/useUserConnected'

function Header() {
  const { isConnected, toggleConnected } = useUserConnected()

  return (
    <header className="headerPage">
      <figure className="logo">
        <Link href="/">
          <a className="logo__link">
            <img src="logo.png" alt="Age of Words" className="logo__img" />
          </a>
        </Link>
      </figure>
      {isConnected.connected ? (
        <div>{isConnected.username.slice(0, 1)}</div>
      ) : (
        <nav className="navBar">
          <Link href="/">
            <a className="button button_home">
              <span className="button_home__letter">Sign in</span>
            </a>
          </Link>
          <Link href="/">
            <a className="button button_home">
              <span className="button_home__letter">Sign up</span>
            </a>
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
