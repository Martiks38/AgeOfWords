import { Dispatch, FormEvent, SetStateAction } from 'react'
import { regex } from '../const/regex'
import { SignUpForm } from '../interfaces'
import { ErrorField } from '../types'

export const createUser = async (
  event: FormEvent<HTMLFormElement>,
  setForm: Dispatch<SetStateAction<SignUpForm>>
) => {
  const { username, email, password } = event.currentTarget

  event.preventDefault()

  let passUsername = regex[username.id].test(username.value)
  let passEmail = regex[email.id].test(email.value)
  let passPassword = regex[password.id].test(password.value)

  if (passUsername && passEmail && passPassword) {
    try {
      let body = {
        email: email.value,
        password: password.value,
        username: username.value,
      }

      let options = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body),
      }

      let res = await fetch('http://localhost:3030/api/v1/signup', options)
      let data: any = await res.json()

      window.localStorage.setItem(
        'AWSession',
        JSON.stringify({
          token: data.token,
          username: data.newUser.username,
          expires: new Date(86400 * 7).toUTCString(),
        })
      )
    } catch (error: any) {
      setForm({ message: error.message, error: true, errorField: {} })
    }
  } else {
    let errorObj: ErrorField = {}

    // Check which fields are invalid and adds them to errorObj
    if (!passUsername) errorObj[username.id] = true
    if (!passUsername) errorObj[username.id] = true
    if (!passUsername) errorObj[username.id] = true

    setForm({
      message: 'One or more fields are invalid',
      error: true,
      errorField: errorObj,
    })
  }
}
