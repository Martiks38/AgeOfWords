import mongoose from 'mongoose'

import { URLMONGO } from './env.mjs'

mongoose
  .connect(URLMONGO)
  .then((db) => console.log('Db is connected'))
  .catch((error) => console.log(error))
