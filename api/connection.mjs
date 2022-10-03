import mongoose from 'mongoose'

import { CONNECTION } from './env.mjs'

mongoose
  .connect(CONNECTION)
  .then((db) => console.log('Db is connected'))
  .catch((error) => console.log(error))
