import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'
import { USER_ROLE } from '../user/user.constant'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
)
router.post('/refresh-token', AuthController.refreshToken)
export const AuthRoute = router
router.post(
  '/update-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.updatePasswordValidationSchema),
  AuthController.updatePassword,
)
