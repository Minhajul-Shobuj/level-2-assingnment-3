import { model, Schema } from 'mongoose'
import { TOrder } from './order.interface'

const orderSchema = new Schema<TOrder>(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      contactNo: { type: String, required: true },
    },
    products: [
      {
        name: { type: String, required: true },
        id: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
)

export const Order = model<TOrder>('Order', orderSchema)
