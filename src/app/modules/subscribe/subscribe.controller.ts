import { RequestHandler } from 'express'
import catchAsync from '../../utiles/catchAsync'
import sendResponse from '../../utiles/sendResponse'
import httpStatus from 'http-status'
import { SubsCribeService } from './subscribe.service'

const createSubscribe: RequestHandler = catchAsync(async (req, res) => {
  const result = await SubsCribeService.createSubscribeInDB(req.body)

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Subscribed successfully',
  })
})
const getAllSubscribers: RequestHandler = catchAsync(async (req, res) => {
  const result = await SubsCribeService.getAllSubscribesFromDB()
  sendResponse(res, {
    success: true,
    data: result,
    message: 'Successfully get all Subscribers from database',
    statusCode: httpStatus.OK,
  })
})

export const SubscribeController = {
  createSubscribe,
  getAllSubscribers,
}
