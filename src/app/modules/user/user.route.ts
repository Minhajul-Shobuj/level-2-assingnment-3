import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
import { USER_ROLE } from './user.constant'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/register',
  validateRequest(UserValidation.userSchemaValidation),
  UserController.createUser,
)

router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserController.getMe)

export const UserRoute = router
