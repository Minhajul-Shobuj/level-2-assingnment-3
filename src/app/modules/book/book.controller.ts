import { RequestHandler } from 'express'
import sendResponse from '../../utiles/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utiles/catchAsync'
import { BookService } from './book.service'
import { checkGivenId } from '../admin/admin.utiles'

const createBook: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookService.createBookInDB(req.body)

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Book created successfully',
  })
})
const getAllBooks: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookService.getAllBookFromDB(req.query)
  sendResponse(res, {
    success: true,
    data: result,
    message: 'Successfully get all Books from database',
    statusCode: httpStatus.OK,
  })
})
const getSingleBook: RequestHandler = catchAsync(async (req, res) => {
  const { bookId } = req.params
  const result = await BookService.getSingleBookFromDB(bookId)
  sendResponse(res, {
    success: true,
    data: result,
    message: 'Successfully get the Book from database',
    statusCode: httpStatus.OK,
  })
})

const updateBook: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  checkGivenId(id)
  const result = await BookService.updateBookInDb(id, req.body)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
  })
})
const deleteBook: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  await BookService.deleteBookFromDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
  })
})
export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
