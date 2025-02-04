import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TOrder } from './order.interface'
import { Order } from './order.model'
import httpStatus from 'http-status'

//post an order in database

const createOrderIndb = async (payload: Partial<TOrder>) => {
  const result = await Order.create(payload)
  return result
}
const getAllOrderFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['status', 'id']
  const UserQuery = new QueryBuilder(Order.find(), query)
    .search(searchableFields)
    .filter()
  const result = await UserQuery.modelQuery
  return result
}
const getMyOrderFromDB = async (email: string) => {
  const result = await Order.find({ 'customer.email': email })
  return result
}
const updateOrderStaus = async (id: string, payload: Partial<TOrder>) => {
  const isBookExist = await Order.findById(id)
  if (!isBookExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found')
  }
  const result = await Order.findOneAndUpdate(
    { _id: id },
    { ...payload },
    { new: true, runValidators: true },
  )
  return result
}

export const OrderService = {
  createOrderIndb,
  getAllOrderFromDB,
  updateOrderStaus,
  getMyOrderFromDB,
}
