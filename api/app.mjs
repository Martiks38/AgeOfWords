import express from 'express'
import cors from 'cors'

const app = express()

const { PORT } = await import('./env.mjs')
import wordRoutes from './routes/wordRoutes.mjs'

const port = PORT || 3000

app.set('port', port)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', wordRoutes)

export default app
