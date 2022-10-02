import { Link } from 'wouter'

import { useUserConnected } from '../../hooks/useUserConnected'
import { signOut } from '../../utils/signOut'
import { toggleViewMenu } from '../../utils/toggleViewMenu'

function IconUser({ letter }: { letter: string }) {
  const { toggleConnected } = useUserConnected()

  return (
    <>
      <div className="iconUser" onClick={toggleViewMenu}>
        {letter.toUpperCase()}
      </div>
      <ul className="accountMenu hidden">
        <li>
          <Link href="/setting">
            <a className="accountMenu__item">Account settings</a>
          </Link>
        </li>
        <li>
          <Link href="/#">
            <a className="accountMenu__item">Statistics</a>
          </Link>
        </li>
        <li>
          <span
            className="accountMenu__item"
            onClick={() => signOut(toggleConnected)}
          >
            Log Out
          </span>
        </li>
      </ul>
    </>
  )
}

export default IconUser
