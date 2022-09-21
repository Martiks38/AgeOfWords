import { Router } from 'express'
import userController from '../Controller/user.controller.mjs'

import { accountExist } from '../middleware/accountExist.mjs'
import { verifyToken } from '../middleware/authJwt.mjs'
import { checkCreationFields } from '../middleware/verifyAccountCreation.mjs'
import { verifyModifyUser } from '../middleware/verifyModifyUser.mjs'

const router = Router()

router
  .get('/user/:id', userController.getUser)
  .get('/users', userController.getUsers)

router.post(
  '/user/create',
  [checkCreationFields, accountExist],
  userController.createUser
)

router.patch(
  '/user/modify',
  [verifyToken, verifyModifyUser],
  userController.modifyUser
)

export default router
