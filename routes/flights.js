import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()


// GET /flights/
router.get('/', flightsCtrl.index)


router.get('/new', flightsCtrl.new)

router.post('/', flightsCtrl.create)

export { router }