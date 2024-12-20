import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import auth from '../../middlewares/auth'
import { AdminController } from './admin.controller'
import { UserValidation } from '../user/user.validation'

const router = express.Router()

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.blockUserValidation),
  AdminController.blockUser,
)

router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  AdminController.deleteBlogByAdmin,
)

export const AdminRoute = router
