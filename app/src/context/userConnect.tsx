import { createContext, useLayoutEffect, useState } from 'react'
import { UserConnectedContextState } from '../types'
import { getDataUser } from '../utils/getDataUser'

type props = { children: JSX.Element | JSX.Element[] }

const initialConnection = {
  username: '',
  connected: false,
}

export const UserCtx = createContext<UserConnectedContextState>(
  {} as UserConnectedContextState
)

function UserProvider({ children }: props) {
  const [isConnected, setIsConnected] = useState(initialConnection)

  useLayoutEffect(() => {
    let data = getDataUser()

    if (!data) return

    if (data.expires !== new Date().toUTCString())
      setIsConnected({ username: data.username, connected: true })
  }, [getDataUser])

  const toggleConnected = (connected: boolean, username?: string) => {
    connected && username
      ? setIsConnected({ username, connected })
      : setIsConnected({ username: '', connected: false })
  }

  return (
    <UserCtx.Provider value={{ isConnected, toggleConnected }}>
      {children}
    </UserCtx.Provider>
  )
}

export default UserProvider
