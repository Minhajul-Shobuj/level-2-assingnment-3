import { z } from 'zod'

const catogorySchemaValidation = z.object({
  body: z.object({
    title: z.string(),
    imgUrl: z.string(),
  }),
})

export const CategoryValidation = {
  catogorySchemaValidation,
}
