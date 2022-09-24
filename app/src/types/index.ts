type ErrorField = { [index: string]: boolean }

type UserConnectedContextState = {
  isConnected: {
    username: string
    connected: boolean
  }
  toggleConnected: (connected: boolean, username?: string) => void
}

export type { UserConnectedContextState, ErrorField }
