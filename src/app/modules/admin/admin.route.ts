import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import auth from '../../middlewares/auth'
import { AdminController } from './admin.controller'
import { BookValidation } from '../book/book.vlidation'
import { BookController } from '../book/book.controller'
import { UserController } from '../user/user.controller'
import { upload } from '../../utiles/sendImageToCloudinary'
import { OrderController } from '../orders/order.controller'
import { Ordervalidation } from '../orders/order.validation'

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
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
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

export const AdminRoute = router
