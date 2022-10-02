import { createContext, useLayoutEffect, useRef, useState } from 'react'

import { getDataUser } from '../utils/getDataUser'
import { initialConnection } from '../const/variables'

import { UserConnectedContextState } from '../types'
type props = { children: JSX.Element | JSX.Element[] }

export const UserCtx = createContext<UserConnectedContextState>(
  {} as UserConnectedContextState
)

function UserProvider({ children }: props) {
  const [isConnected, setIsConnected] = useState(initialConnection)

  const checkSearch = useRef<boolean>(false)

  useLayoutEffect(() => {
    const controller = new AbortController()
    const controllerRenewSession = new AbortController()

    const initUser = async () => {
      try {
        let data: { token: string; username: string; expires: string } =
          getDataUser()

        if (!data || Date.parse(data.expires) <= Date.now()) return

        if (Date.parse(data.expires) - Date.now() < 86400 * 1000) {
          try {
            let optionsRenewSession = {
              method: 'POST',
              headers: {
                'x-access-token': data.token,
              },
              AbortSignal: controller.signal,
            }

            const resRenewSession = await window.fetch(
              'http://localhost:3030/api/v1/user/renewSession',
              optionsRenewSession
            )

            const dataResRenewSession = await resRenewSession.json()

            if (resRenewSession.status < 200 || resRenewSession.status > 299)
              throw { message: 'Error renew session' }

            let expires = Date.now() + 86400 * 7 * 1000

            let stringNewDataUser = {
              ...data,
              token: dataResRenewSession.token,
              expires: new Date(expires).toUTCString(),
            }

            window.localStorage.setItem(
              'AWSession',
              JSON.stringify(stringNewDataUser)
            )
          } catch (error: any) {
            console.error(error.message)
          }
        }

        let optionsGet = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': data.token,
          },
          body: JSON.stringify({
            field: 'results',
          }),
          AbortSignal: controller.signal,
        }

        const resGet = await window.fetch(
          'http://localhost:3030/api/v1/user/oneData',
          optionsGet
        )
        const dataResGet = await resGet.json()

        if (resGet.status < 200 || resGet.status > 299) throw dataResGet

        setIsConnected({
          username: data.username,
          connected: true,
          results: dataResGet,
        })
      } catch (error: any) {
        console.error(error.message)
      }
    }

    if (!checkSearch.current) {
      initUser()
      checkSearch.current = true
    }

    return () => {
      controller.abort()
      controllerRenewSession.abort()
    }
  }, [getDataUser])

  const toggleConnected = (connected: boolean, username: string) => {
    if (connected && username) {
      setIsConnected((prevValues) => {
        return { ...prevValues, username, connected }
      })
    } else {
      setIsConnected((prevValues) => {
        return { ...prevValues, username: '', connected: false }
      })
      checkSearch.current = false
    }
  }

  return (
    <UserCtx.Provider value={{ isConnected, setIsConnected, toggleConnected }}>
      {children}
    </UserCtx.Provider>
  )
}

export default UserProvider
