import { RequestHandler } from 'express'
import { OrderService } from './order.service'
import catchAsync from '../../utiles/catchAsync'
import sendResponse from '../../utiles/sendResponse'
import httpStatus from 'http-status'
import { checkGivenId } from '../admin/admin.utiles'

const createOrder: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.createOrderIndb(req.body)
  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Successfully Make an order',
  })
})
const getAllOrders: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrderFromDB(req.query)
  sendResponse(res, {
    success: true,
    data: result,
    message: 'Successfully get all Orders from database',
    statusCode: httpStatus.OK,
  })
})
const getMyOrders: RequestHandler = catchAsync(async (req, res) => {
  const email = req.user?.email
  const result = await OrderService.getMyOrderFromDB(email)
  sendResponse(res, {
    success: true,
    data: result,
    message: 'Successfully get all Orders from database',
    statusCode: httpStatus.OK,
  })
})
const updateOrderStaus: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  checkGivenId(id)
  const result = await OrderService.updateOrderStaus(id, req.body)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status updated successfully',
  })
})

export const OrderController = {
  createOrder,
  getAllOrders,
  updateOrderStaus,
  getMyOrders,
}
