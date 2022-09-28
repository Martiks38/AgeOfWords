import { Dispatch, SetStateAction } from 'react'

type ErrorField = { [index: string]: boolean }

type SetState<T> = Dispatch<SetStateAction<T>>

type UserConnectedContextState = {
  isConnected: {
    username: string
    connected: boolean
  }
  setIsConnected: SetState<{
    username: string
    connected: boolean
  }>

  toggleConnected: (connected: boolean, username?: string) => void
}

export type { ErrorField, UserConnectedContextState, SetState }
