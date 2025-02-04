import QueryBuilder from '../../builder/QueryBuilder'
import { TUser } from './user.interface'
import { User } from './user.model'

const createUserInDB = async (payload: TUser) => {
  const result = await User.create(payload)
  return result
}

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'author']
  const UserQuery = new QueryBuilder(User.find(), query)
    .search(searchableFields)
    .filter()
  const result = await UserQuery.modelQuery
  return result
}
const getMe = async (email: string) => {
  const result = await User.findOne({ email: email })
  return result
}

export const UserService = {
  createUserInDB,
  getMe,
  getAllUserFromDB,
}
