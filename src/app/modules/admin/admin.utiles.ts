import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

export const checkRoleIsValid = (role: string) => {
  if (role !== 'admin') {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized')
  }
}
export const checkGivenId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid blog ID')
  }
}
