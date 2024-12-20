import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'
import httpStatus from 'http-status'
import { validateAndFilterPayload } from './blog.utiles'
import QueryBuilder from '../../builder/QueryBuilder'

const createBlogInDB = async (payload: TBlog) => {
  const author = await User.isUserExistsById(payload?.author)
  if (!author) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author is not valid')
  }
  const result = (await Blog.create(payload)).populate('author')
  return result
}
const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query }
  // let searchTerm = ''
  const searchableFields = ['title', 'content']
  // if (query?.search) {
  //   searchTerm = query?.search as string
  // }
  // const searchQuery = Blog.find({
  //   $or: searchableFields.map(field => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })
  // const excludeFields = ['search']
  // excludeFields.forEach(el => delete queryObj[el])
  // const filterQuery = searchQuery.find(queryObj).populate('author')

  // let sort: string = '-createdAt'
  // if (query?.sort) {
  //   sort = query.sort as string
  // }
  // const sortQuery = await filterQuery.sort(sort)
  // console.log(sortQuery)

  // return sortQuery

  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .filter()
  const result = await blogQuery.modelQuery
  return result
}
const updateBlogInDb = async (
  id: string,
  payload: { title: string; content: string },
) => {
  const allowedFields = ['title', 'content']
  validateAndFilterPayload(payload, allowedFields)

  const result = await Blog.findOneAndUpdate(
    { _id: id },
    { ...payload },
    { new: true, runValidators: true },
  )
  return result
}
const deleteBlogFromDb = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id)
  return result
}

export const BlogService = {
  createBlogInDB,
  getAllBlogFromDB,
  deleteBlogFromDb,
  updateBlogInDb,
}
