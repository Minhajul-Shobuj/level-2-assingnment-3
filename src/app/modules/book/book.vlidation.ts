import { z } from 'zod'

const bookSchemaValidation = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    publishedDate: z.string(),
    price: z.number(),
    stock: z.number(),
    description: z.string(),
    bookImg: z.string(),
  }),
})
const updateBookSchemaValidation = z.object({
  body: z.object({
    price: z.number().optional(),
    stock: z.number().optional(),
    description: z.string().optional(),
  }),
})

export const BookValidation = {
  bookSchemaValidation,
  updateBookSchemaValidation,
}
