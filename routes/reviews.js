const { Router } = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { Review } = require('../database/models')

const router = Router()

router.get('/movie/:id', async (req, res) => {
  const idMovieApi = req.params.id

  try {
    const movieReviews = await Review.findAll({
      where: {
        movieId: idMovieApi
      },
      attributes: ["text", "score", "username"]
    })

    res.status(200).send(movieReviews)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/new/:id', verifyToken, async (req, res) => {
  // const idMovieApi = req.params.id --> probar luego si se puede hacer una peticion a esta ruta desde :3000/movie/id
  const idMovieApi = req.params.id
  const { text, score, username } = req.body
  try {
    const newReview = await Review.create({
      movieId: idMovieApi,
      text,
      score,
      username
    })

    res.status(200).send({ message: "reseña agregada", newReview })

  } catch (error) {
    res.status(400).send(error.message)
  }

})


module.exports = router