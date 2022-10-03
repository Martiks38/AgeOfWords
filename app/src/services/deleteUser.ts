import { FormEvent } from 'react'
import { DataUser, Results, SetLocation, SetState } from '../types'
import { getDataUser } from '../utils/getDataUser'

export const accountDelete = async (
  event: FormEvent<HTMLFormElement>,
  setError: SetState<{ message: string; isThere: boolean }>,
  setIsConnected: SetState<{
    username: string
    connected: boolean
    results: Results
  }>,
  setLocation: SetLocation
) => {
  try {
    event.preventDefault()

    const dataUser: DataUser = getDataUser()

    if (!dataUser) return

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
