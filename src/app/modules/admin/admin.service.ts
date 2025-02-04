import { Blog } from '../blog/blog.model'
import { User } from '../user/user.model'

const blockUserInDB = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new Error('User not Found')
  }
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { isBlocked: true },
    { new: true, runValidators: true },
  )

  if (!result) {
    throw new Error('User not found')
  }
  return result
}

const deleteBlogFromDb = async (id: string) => {
  const blog = await Blog.findById(id)
  if (!blog) {
    throw new Error('Blog is already Deleted')
  }
  const result = await Blog.findByIdAndDelete(id)
  return result
}

export const AdminService = {
  deleteBlogFromDb,
  blockUserInDB,
}
