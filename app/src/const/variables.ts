import { DataGame } from '../interfaces'

const wordsMatrix: string[][] = Array.from({ length: 6 }, () =>
  new Array(5).fill('')
)

const initialDataGame: DataGame = {
  answer: '',
  status: 'playing',
  turn: 0,
  words: wordsMatrix,
}

const initialConnection = {
  username: '',
  connected: false,
  results: {
    try_1: 0,
    try_2: 0,
    try_3: 0,
    try_4: 0,
    try_5: 0,
    try_6: 0,
    total: 0,
  },
}

export { initialConnection, initialDataGame }
