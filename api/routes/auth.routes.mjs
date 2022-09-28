import { Router } from 'express'
import authController from '../Controller/auth.controller.mjs'

import { accountExist } from '../middleware/accountExist.mjs'
import { checkCreationFields } from '../middleware/verifyAccountCreation.mjs'

const router = Router()

router
  .post('/signin', authController.signIn)
  .post('/signup', [checkCreationFields, accountExist], authController.signUp)

export default router
