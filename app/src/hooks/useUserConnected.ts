import { useContext } from 'react'

import { UserCtx } from '../context/userConnect'

import { UserConnectedContextState } from '../types'

export const useUserConnected = () => {
  const { isConnected, setIsConnected, toggleConnected } =
    useContext<UserConnectedContextState>(UserCtx)

  return { isConnected, setIsConnected, toggleConnected }
}
