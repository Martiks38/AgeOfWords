import { FormEvent } from 'react'

import { StateForm } from '../interfaces'
import { SetState } from '../types'

export const loginUser = async (
  event: FormEvent<HTMLFormElement>,
  setForm: SetState<StateForm>,
  toggleConnected: (connected: boolean, username?: string) => void
) => {
  const { username, password } = event.currentTarget

  event.preventDefault()

  try {
    let body = {
      password: password.value,
      username: username.value,
    }

    let options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(body),
    }

    let res = await fetch('http://localhost:3030/api/v1/signin', options)
    let data: any = await res.json()

    if (res.status < 200 || res.status > 299) throw data

    let dateOfExpiry = Date.now() + 86400 * 7

    window.localStorage.setItem(
      'AWSession',
      JSON.stringify({
        token: data.token,
        username: username.value,
        expires: new Date(dateOfExpiry).toUTCString(),
      })
    )

    setForm({
      message: '',
      error: false,
      errorField: {},
      checkForm: true,
    })

    toggleConnected(true, username.value)
  } catch (error: any) {
    setForm({
      message: error.message,
      error: true,
      errorField: {},
      checkForm: false,
    })
  }
}
