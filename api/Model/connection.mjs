import { readFile } from 'fs/promises'
import mysql from 'promise-mysql'

import { db } from '../const.mjs'

const file = await readFile('./Model/dbConf.json', 'utf-8')

const conf = JSON.parse(file)

let confDB = { ...conf.mysql, ...db }

let myConn = mysql.createConnection(confDB)

export const getConnection = () => myConn
