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

export { initialDataGame }
