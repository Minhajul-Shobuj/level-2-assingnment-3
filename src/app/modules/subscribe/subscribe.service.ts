import { TSubscribe } from './subscribe.interface'
import { Subscribe } from './subscribe.model'

const createSubscribeInDB = async (payload: TSubscribe) => {
  const result = await Subscribe.create(payload)
  return result
}
const getAllSubscribesFromDB = async () => {
  const result = await Subscribe.find()
  return result
}

export const SubsCribeService = {
  createSubscribeInDB,
  getAllSubscribesFromDB,
}
