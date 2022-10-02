import { FormEvent } from 'react'
import { Results, SetState } from '../types'

export const accountDelete = async (
  event: FormEvent<HTMLFormElement>,
  setError: SetState<{ message: string; isThere: boolean }>,
  setIsConnected: SetState<{
    username: string
    connected: boolean
    results: Results
  }>,
  setLocation: (
    to: string,
    options?:
      | {
          replace?: boolean | undefined
        }
      | undefined
  ) => void
) => {
  try {
    const data = window.localStorage.getItem('AWSession')

    event.preventDefault()

    if (!data) return

    const dataUser = JSON.parse(data)

    const options = {
      headers: { 'x-access-token': dataUser.token },
      method: 'DELETE',
    }

    const res = await window.fetch(
      'http://localhost:3030/api/v1/user/delete',
      options
    )
    const dataRes = await res.json()

    if (res.status < 200 || res.status >= 300) throw dataRes

    window.localStorage.removeItem('AWSession')

    setIsConnected((prevValues) => {
      return { ...prevValues, username: '', connected: false }
    })

    setLocation('/')
  } catch (error: any) {
    setError({ message: error.message, isThere: true })
  }
}
