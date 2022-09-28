import { FormEvent } from 'react'

import { SetState } from '../types'

export const accountUpdate = async (
  event: FormEvent<HTMLFormElement>,
  setError: SetState<{
    message: string
    isThere: boolean
  }>,
  setIsConnected: SetState<{
    username: string
    connected: boolean
  }>
) => {
  try {
    const data = window.localStorage.getItem('AWSession')

    event.preventDefault()

    if (!data) return

    const dataUser = JSON.parse(data)

    const { id, value } = event.currentTarget.newData

    const body = { fiel: id, newValue: value }

    let options = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': dataUser.token,
      },
      method: 'PATCH',
      body: JSON.stringify(body),
    }

    const res = await fetch('http://localhost:3030/api/v1/user/modify', options)
    const dataRes = await res.json()

    if (res.status < 200 || res.status > 299) throw dataRes

    window.localStorage.setItem(
      'AWSession',
      JSON.stringify({ ...dataUser, username: value })
    )

    setIsConnected((prevValue) => {
      return { ...prevValue, username: value }
    })
  } catch (error: any) {
    setError({ message: error.message, isThere: true })
  }
}
