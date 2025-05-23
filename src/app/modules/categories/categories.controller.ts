import { RequestHandler } from 'express'
import catchAsync from '../../utiles/catchAsync'
import { CategoryService } from './categories.service'
import sendResponse from '../../utiles/sendResponse'
import httpStatus from 'http-status'

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryInDB(req.body)

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully',
  })
})
const getAllCategories: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategoryFromDB()
  sendResponse(res, {
    success: true,
    data: result,
    message: 'Successfully get all categories from database',
    statusCode: httpStatus.OK,
  })
})

export const CategoryController = {
  createCategory,
  getAllCategories,
}
