import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

config()

const app = express()
const PORT = process.env.PORT || 3000

app.set('port', PORT)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', wordRoutes)

app.listen(app.get('port'), () => {
  console.log('API levantada en el puerto', app.get('port'))
})
