import { model, Schema } from 'mongoose'
import { TSubscribe } from './subscribe.interface'

const subscribeSchema = new Schema<TSubscribe>(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Subscribe = model<TSubscribe>('Subscribe', subscribeSchema)
