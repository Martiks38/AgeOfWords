import { Router } from 'express'
import userController from '../Controller/user.controller.mjs'

import { accountExist } from '../middleware/accountExist.mjs'
import { verifyToken } from '../middleware/authJwt.mjs'
import { checkCreationFields } from '../middleware/verifyAccountCreation.mjs'
import { verifyModifyUser } from '../middleware/verifyModifyUser.mjs'

const router = Router()

router
  .get('/users', userController.getUsers)
  .get('/:id', userController.getUser)

router
  .post(
    '/create',
    [checkCreationFields, accountExist],
    userController.createUser
  )
  .post('/oneData', verifyToken, userController.getOneDataUser)
  .post('/renewSession', verifyToken, userController.newToken)

router.patch(
  '/modify',
  [verifyToken, verifyModifyUser],
  userController.modifyUser
)

router.delete('/delete', verifyToken, userController.deleteUser)

export default router
