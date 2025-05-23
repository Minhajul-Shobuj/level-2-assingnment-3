import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import auth from '../../middlewares/auth'
import { AdminController } from './admin.controller'
import { BookValidation } from '../book/book.vlidation'
import { BookController } from '../book/book.controller'
import { UserController } from '../user/user.controller'
import { OrderController } from '../orders/order.controller'
import { Ordervalidation } from '../orders/order.validation'
import { CategoryValidation } from '../categories/categories.validation'
import { CategoryController } from '../categories/categories.controller'

const router = express.Router()

router.get('/users', auth(USER_ROLE.admin), UserController.getAllUsers)
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminController.blockUser,
)

router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  AdminController.deleteBlogByAdmin,
)

router.post(
  '/create-book',
  auth(USER_ROLE.admin),
  validateRequest(BookValidation.bookSchemaValidation),
  BookController.createBook,
)

router.patch(
  '/books/:id',
  auth(USER_ROLE.admin),
  validateRequest(BookValidation.updateBookSchemaValidation),
  BookController.updateBook,
)
router.delete('/book/:id', auth(USER_ROLE.admin), BookController.deleteBook)
router.get('/orders', auth(USER_ROLE.admin), OrderController.getAllOrders)
router.patch(
  '/orders/:id',
  auth(USER_ROLE.admin),
  validateRequest(Ordervalidation.updateOrderStatusValidationSchema),
  OrderController.updateOrderStaus,
)

router.post(
  '/create-category',
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidation.catogorySchemaValidation),
  CategoryController.createCategory,
)

export const AdminRoute = router
