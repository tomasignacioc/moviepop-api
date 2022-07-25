const { Router } = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { User } = require('../database/models')
const { FavMovie } = require('../database/models')

const router = Router()

router.get('/user/', verifyToken, async (req, res) => {

  try {
    const favoriteMovies = await FavMovie.findAll({
      where: {
        userId: req.userVerification.id
      },
      attributes: ["name"]
    })

    res.status(200).send(favoriteMovies)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/add', verifyToken, async (req, res) => {

  try {
    const [favMovie, created] = await FavMovie.findOrCreate({
      where: { name: req.body.name },
      defaults: {
        name: req.body.name,
        userId: req.userVerification.id
      }
    })

    if (!created) {
      res.send({ message: "la pelicula ya fue agregada a Favoritos" })
    } else {
      res.status(203).send({ message: "pelicula agregada a Favoritos", favMovie })
    }

  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router