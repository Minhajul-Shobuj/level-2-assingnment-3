import express from 'express'
import { CategoryController } from './categories.controller'

const router = express.Router()

router.get('/', CategoryController.getAllCategories)

export const CategoryRoute = router
