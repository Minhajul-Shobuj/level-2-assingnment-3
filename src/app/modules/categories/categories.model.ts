import { model, Schema } from 'mongoose'
import { TCategory } from './categories.interface'

const categoriesSchema = new Schema<TCategory>(
  {
    title: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Category = model<TCategory>('Category', categoriesSchema)
