import { Router } from 'express'
import userController from '../Controller/user.controller.mjs'

import { accountExist } from '../middleware/accountExist.mjs'
import { checkCreationFields } from '../middleware/verifyAccountCreation.mjs'

const router = Router()

router
  .get('/user/:id', userController.getUser)
  .get('/users', userController.getUsers)

router.post(
  '/user/create',
  [checkCreationFields, accountExist],
  userController.createUser
)

export default router
