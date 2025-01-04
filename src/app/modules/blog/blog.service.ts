import { User } from '../user/user.model'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'
import { validateAndFilterPayload } from './blog.utiles'
import QueryBuilder from '../../builder/QueryBuilder'

const createBlogInDB = async (payload: TBlog, email: string) => {
  const user = await User.findOne({ email })
  if (user) {
    payload.author = user?._id
  }
  const result = (await Blog.create(payload)).populate('author')
  return result
}
const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content']
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .filter()
  const result = await blogQuery.modelQuery.populate('author')
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
