const router = require('express').Router()
const { getPopular, search, getDetails, getRandom } = require('../controllers/movieController')

router.get('/popular', getPopular)
router.get('/search', search)
router.get('/random', getRandom)
router.get('/:id', getDetails)

module.exports = router
