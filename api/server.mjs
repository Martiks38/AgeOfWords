import app from './app.mjs'

app.listen(app.get('port'), () => {
  console.log('API levantada en el puerto', app.get('port'))
})
