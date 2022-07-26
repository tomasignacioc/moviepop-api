const { Router } = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { Review } = require('../database/models')

const router = Router()

router.get('/movie/:id', async (req, res) => {
  const movieTitle = req.params.id

  try {
    const movieReviews = await Review.findAll({
      where: {
        movieTitle
      },
      attributes: ["text", "score", "username"]
    })

    res.status(200).send(movieReviews)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.post('/new/:id', verifyToken, async (req, res) => {

  const movieTitle = req.params.id
  const { text, score, username } = req.body

  try {
    const newReview = await Review.create({
      movieTitle,
      text,
      score,
      username
    })

    res.status(200).send({ success: "reseña agregada", newReview })

  } catch (error) {
    res.status(400).send({ error: error.message })
  }

})


module.exports = router