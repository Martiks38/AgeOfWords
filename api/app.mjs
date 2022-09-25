import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes.mjs'
import userRoutes from './routes/user.routes.mjs'
import wordRoutes from './routes/word.routes.mjs'

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

app.use('/api/v1/word', wordRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1', authRoutes)

export default app
