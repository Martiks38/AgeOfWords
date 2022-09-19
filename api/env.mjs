import { config } from 'dotenv'

config()

const { DATABASE, HOST, PASSWORD, PORT_DB, PORT, USER } = process.env

const db = {
  database: DATABASE,
  host: HOST,
  password: PASSWORD,
  port: PORT_DB,
  user: USER,
}

export { db, PORT, serverError }
