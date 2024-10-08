import { Router } from 'express'
import * as mealsCtrl from '../controllers/meals.js'

const router = Router()


// GET /meals

router.get('/new', mealsCtrl.new)
router.post('/', mealsCtrl.create)
router.delete('/:mealId', mealsCtrl.delete)
export { router }