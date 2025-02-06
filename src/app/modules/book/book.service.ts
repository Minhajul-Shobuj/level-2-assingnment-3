import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TBook } from './book.interface'
import { Book } from './book.model'
import httpStatus from 'http-status'

const createBookInDB = async (payload: TBook) => {
  const result = await Book.create(payload)
  return result
}
const getAllBookFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'author']
  const bookQuery = new QueryBuilder(Book.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
  const result = await bookQuery.modelQuery
  return result
}
const getSingleBookFromDB = async (bookId: string) => {
  const result = await Book.findById(bookId)
  return result
}
const updateBookInDb = async (id: string, payload: Partial<TBook>) => {
  const isBookExist = await Book.findById(id)
  if (!isBookExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Book not found')
  }
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { ...payload },
    { new: true, runValidators: true },
  )
  return result
}
const deleteBookFromDb = async (id: string) => {
  const result = await Book.findByIdAndDelete(id)
  return result
}
export const BookService = {
  createBookInDB,
  getAllBookFromDB,
  getSingleBookFromDB,
  updateBookInDb,
  deleteBookFromDb,
}
