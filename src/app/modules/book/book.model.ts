import { model, Schema } from 'mongoose'
import { TBook } from './book.interface'

const bookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      unique: true,
      minlength: [7, 'Title can not be less than 7 characters'],
      maxlength: [50, 'Title can not be more than 50 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      minlength: [7, 'Author can not be less than 7 characters'],
      maxlength: [30, 'Author can not be more than 30 characters'],
    },
    bookImg: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: [true, 'Published Date is required'],
    },
    price: {
      type: Number,
      required: [true, 'Published Date is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Published Date is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [20, 'Description can not be less than 7 characters'],
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
  },
  {
    timestamps: true,
  },
)

export const Book = model<TBook>('Book', bookSchema)
