const reviewsRouter = require('./reviews')
const favoritesRouter = require('./favorites')
const authRouter = require('./login-register')

const { Router } = require('express')

const router = Router()

router.use('/reviews', reviewsRouter)
router.use('/favorites', favoritesRouter)
router.use('/auth', authRouter)

module.exports = router