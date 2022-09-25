import { config } from 'dotenv'

config()

const { PORT, SECRET, URLMONGO } = process.env

export { PORT, SECRET, URLMONGO }
