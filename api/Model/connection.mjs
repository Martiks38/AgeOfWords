import mysql from 'promise-mysql'
import conf from './db.conf.json'

let { db } = await import('../const')

let confDB = { ...conf.mysql, ...db }

let myConn = mysql.createConnection(confDB)

export const getConnection = () => myConn
