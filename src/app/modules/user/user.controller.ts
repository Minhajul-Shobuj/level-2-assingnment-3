import { RequestHandler } from 'express'
import catchAsync from '../../utiles/catchAsync'
import { UserService } from './user.service'
import sendResponse from '../../utiles/sendResponse'
import httpStatus from 'http-status'

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.createUserInDB(req.body)

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
  })
})
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.getAllUserFromDB(req.query)
  sendResponse(res, {
    success: true,
    data: result,
    message: 'Successfully get all Users from database',
    statusCode: httpStatus.OK,
  })
})

const getMe = catchAsync(async (req, res) => {
  const email = req.user?.email
  const result = await UserService.getMe(email)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  })
})

export const UserController = {
  createUser,
  getAllUsers,
  getMe,
}
