import { Link } from 'wouter'
import IconUser from '../IconUser'
import { useUserConnected } from '../../hooks/useUserConnected'

function Header() {
  const { isConnected } = useUserConnected()

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
        <IconUser letter={isConnected.username.slice(0, 1)} />
      ) : (
        <nav className="navBar">
          <Link href="/login">
            <a className="button button_home">
              <span className="button_home__letter">Sign in</span>
            </a>
          </Link>
          <Link href="/signup">
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
