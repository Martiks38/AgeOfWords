import express from 'express'
import cors from 'cors'

const app = express()

const { PORT } = await import('./const.mjs')
import wordRoutes from './routes/wordRoutes.mjs'

const port = PORT || 3000

app.set('port', port)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', wordRoutes)

app.listen(app.get('port'), () => {
  console.log('API levantada en el puerto', app.get('port'))
})
