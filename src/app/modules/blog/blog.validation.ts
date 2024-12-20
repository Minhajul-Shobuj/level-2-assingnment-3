import { z } from 'zod'

const blogSchemaValidation = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
    isPublished: z.boolean().optional(),
  }),
})
const updateBlogSchemaValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
})

export const BlogValidation = {
  blogSchemaValidation,
  updateBlogSchemaValidation,
}
