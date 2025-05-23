import express from 'express'
import { SubscribeController } from './subscribe.controller'
import validateRequest from '../../middlewares/validateRequest'
import { SubscribeValidation } from './subscribe.validation'

const router = express.Router()

router.post(
  '/',
  validateRequest(SubscribeValidation.subscribeSchemaValidation),
  SubscribeController.createSubscribe,
)

router.get('/', SubscribeController.getAllSubscribers)

export const SubscribeRoute = router
