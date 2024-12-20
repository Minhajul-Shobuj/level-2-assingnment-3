import { z } from 'zod'
import { userRole } from './user.constant'

const userSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(userRole).optional(),
    isBlocked: z.boolean().optional(),
  }),
})
const blockUserValidation = z.object({
  body: z.object({
    isBlocked: z.boolean(),
  }),
})
export const UserValidation = {
  userSchemaValidation,
  blockUserValidation,
}
