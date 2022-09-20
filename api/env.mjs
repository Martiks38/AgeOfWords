import { config } from 'dotenv'

config()

const { PORT, URLMONGO } = process.env

export { PORT, URLMONGO }
