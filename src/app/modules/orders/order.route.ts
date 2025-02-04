import express from 'express'
import { OrderController } from './order.controller'
import validateRequest from '../../middlewares/validateRequest'
import { Ordervalidation } from './order.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/make-order',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(Ordervalidation.orderValidationSchema),
  OrderController.createOrder,
)
router.get(
  '/my-orders',
  auth(USER_ROLE.admin, USER_ROLE.user),
  OrderController.getMyOrders,
)

export const OrderRoute = router
