import { RequestHandler } from 'express'
import catchAsync from '../../utiles/catchAsync'
import sendResponse from '../../utiles/sendResponse'
import { AdminService } from './admin.service'
import httpStatus from 'http-status'
import { checkGivenId, checkRoleIsValid } from './admin.utiles'

const blockUser: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params
  checkRoleIsValid(req.user?.role)
  checkGivenId(userId)

  await AdminService.blockUserInDB(userId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User blocked successfully',
  })
})

const deleteBlogByAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  checkRoleIsValid(req.user?.role)
  checkGivenId(id)
  await AdminService.deleteBlogFromDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  })
})
export const AdminController = {
  deleteBlogByAdmin,
  blockUser,
}
