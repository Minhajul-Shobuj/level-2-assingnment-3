import mongoose from 'mongoose'
import { Blog } from './blog.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

export const checkGivenId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid blog ID')
  }
}

export const isBlogExist = async (id: string) => {
  const blog = await Blog.findById(id)
  if (!blog) {
    throw new Error('Blog is already Deleted')
  }
}
export const checkRoleIsValid = (role: string) => {
  if (role !== 'user') {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized')
  }
}

export const checkAuthorIsValid = (userEmail: string, authorEmail: string) => {
  if (userEmail !== authorEmail) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'YOU cannot perform action to others` blogs',
    )
  }
}

export const validateAndFilterPayload = <T extends object>(
  payload: T,
  allowedFields: string[],
): Partial<T> => {
  const filteredData = Object.keys(payload).reduce((filtered, key) => {
    if (!allowedFields.includes(key)) {
      throw new AppError(
        httpStatus.NOT_ACCEPTABLE,
        `Invalid field: '${key}' is not allowed. Allowed fields are: ${allowedFields.join(
          ', ',
        )}`,
      )
    }
    filtered[key as keyof T] = payload[key as keyof T]
    return filtered
  }, {} as Partial<T>)
  if (Object.keys(filteredData).length === 0) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'No valid fields provided')
  }

  return filteredData
}
