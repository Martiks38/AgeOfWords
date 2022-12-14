import { Dispatch, SetStateAction } from 'react'

type ErrorField = { [index: string]: boolean }

type Results = {
  [index: string]: number
  try_1: number
  try_2: number
  try_3: number
  try_4: number
  try_5: number
  try_6: number
  total: number
}

type SetState<T> = Dispatch<SetStateAction<T>>

type UserConnectedContextState = {
  isConnected: {
    username: string
    connected: boolean
    results: Results
  }
  setIsConnected: SetState<{
    username: string
    connected: boolean
    results: Results
  }>
  toggleConnected: (connected: boolean, username: string) => void
}

type SetLocation = (
  to: string,
  options?:
    | {
        replace?: boolean | undefined
      }
    | undefined
) => void

type DataUser = { token: string; username: string; expires: string }

export type {
  DataUser,
  ErrorField,
  Results,
  SetLocation,
  SetState,
  UserConnectedContextState,
}
