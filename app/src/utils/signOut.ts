export const signOut = (
  toggleConnected: (connected: boolean, username: string) => void
) => {
  window.localStorage.removeItem('AWSession')

  toggleConnected(false, '')
}
