import { z } from 'zod'

const subscribeSchemaValidation = z.object({
  body: z.object({
    email: z.string(),
  }),
})

export const SubscribeValidation = {
  subscribeSchemaValidation,
}
