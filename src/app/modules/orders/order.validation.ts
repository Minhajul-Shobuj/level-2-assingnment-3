import { z } from 'zod'

const customerDetailsValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  contactNo: z.string().min(1, 'Contact number is required'),
})
const productValidation = z.object({
  name: z.string().min(1, 'Product name is required'),
  id: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0, 'Price must be non-negative'),
})

const orderValidationSchema = z.object({
  body: z.object({
    customer: customerDetailsValidation,
    products: z
      .array(productValidation)
      .min(1, 'At least one product is required'),
    totalPrice: z.number().min(0, 'Total price must be non-negative'),
  }),
})
const updateOrderStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['processing', 'delivered', 'cancelled']),
  }),
})

export const Ordervalidation = {
  orderValidationSchema,
  updateOrderStatusValidationSchema,
}
