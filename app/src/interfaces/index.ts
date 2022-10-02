import { ErrorField } from '../types'

interface DataGame {
  answer: string
  status: 'finished' | 'playing'
  turn: number
  words: string[][]
}

interface StateForm {
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

export type { DataGame, Regex, StateForm }
