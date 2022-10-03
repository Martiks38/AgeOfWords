import { FormEvent } from 'react'

import { getDataUser } from '../utils/getDataUser'

import { DataUser, Results, SetState } from '../types'

export const accountUpdate = async (
  event: FormEvent<HTMLFormElement>,
  setError: SetState<{
    message: string
    isThere: boolean
  }>,
  setIsConnected: SetState<{
    username: string
    connected: boolean
    results: Results
  }>
) => {
  event.preventDefault()

  try {
    const dataUser: DataUser = getDataUser()

    if (!dataUser) return

    const { id, value } = event.currentTarget.newData

    const body = { field: id, newValue: value }

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
    // Saves the response message from the server
    // Indicates that there is an error
    setError({ message: error.message, isThere: true })
  }
}
