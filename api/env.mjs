import { config } from 'dotenv'

config()

const { PORT, SECRET, CONNECTION } = process.env

export { PORT, SECRET, CONNECTION }
