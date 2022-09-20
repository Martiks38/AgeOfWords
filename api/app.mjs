import express from 'express'
import cors from 'cors'
import wordRoutes from './routes/wordRoutes.mjs'
import userRoutes from './routes/user.routes.mjs'

import { createListWords } from './libs/initialSetup.mjs'

import './connection.mjs'

const app = express()
createListWords()

const { PORT } = await import('./env.mjs')

const port = PORT || 3000

app.set('port', port)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', wordRoutes)
app.use('/api/v1', userRoutes)

export default app
