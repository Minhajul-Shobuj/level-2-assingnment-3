import { TCategory } from './categories.interface'
import { Category } from './categories.model'

const createCategoryInDB = async (payload: TCategory) => {
  const result = await Category.create(payload)
  return result
}
const getAllCategoryFromDB = async () => {
  const result = await Category.find()
  return result
}

export const CategoryService = {
  createCategoryInDB,
  getAllCategoryFromDB,
}
