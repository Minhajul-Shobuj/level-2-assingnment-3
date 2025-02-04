import { RequestHandler } from 'express'
import config from '../../config'
import catchAsync from '../../utiles/catchAsync'
import sendResponse from '../../utiles/sendResponse'
import { AuthService } from './auth.service'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body)
  const { refreshToken, accessToken } = result
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })

  sendResponse(res, {
    data: {
      accessToken,
    },
    message: 'Login successful',
    success: true,
    statusCode: httpStatus.OK,
  })
})
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  })
})
const updatePassword: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.user as JwtPayload
  const result = await AuthService.updatePassword(userData, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully updated your password!',
    data: result,
  })
})

export const AuthController = {
  loginUser,
  refreshToken,
  updatePassword,
}
