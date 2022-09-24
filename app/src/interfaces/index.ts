import { ErrorField } from '../types'

interface SignUpForm {
  message: string
  error: boolean
  errorField: ErrorField
  checkForm: boolean
}

interface Regex {
  [index: string]: RegExp
  email: RegExp
  password: RegExp
  username: RegExp
}

export type { Regex, SignUpForm }
