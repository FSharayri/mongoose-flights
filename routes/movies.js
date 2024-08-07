import { Router } from 'express'
import * as moviesCtrl from '../controllers/movies.js'

const router = Router()


// GET /movies/
router.get('/', moviesCtrl.index)
// GET /movies/new
router.get('/new', moviesCtrl.new)
// GET /movies/
router.get('/:movieId', moviesCtrl.show)

// post /movies
router.post('/', moviesCtrl.create)

router.delete('/:movieId', moviesCtrl.delete)
export { router }


router.get('/:movieId/edit', moviesCtrl.edit)

router.put('/:movieId', moviesCtrl.update)