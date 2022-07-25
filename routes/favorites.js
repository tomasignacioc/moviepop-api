const { Router } = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { User } = require('../database/models')
const { FavMovie } = require('../database/models')

const router = Router()

router.get('/user/:id', async (req, res) => {

  try {
    const favoriteMovies = await FavMovie.findAll({
      where: {
        userId: req.params.id
      }
    })

    res.send(favoriteMovies)
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
})

router.post('/add', verifyToken, async (req, res) => {
  // honestamente no se si sea buena practica usar el ID que retorna
  // confirmado que es el id del usuario en la bdd
  try {
    const [favMovie, created] = await FavMovie.findOrCreate({
      where: { name: req.body.name },
      defaults: {
        name: req.body.name,
        userId: req.userVerification.id
      }
    })

    if (created) {
      res.send({ message: "la pelicula ya fue agregada a Favoritos" })
    } else {
      res.status(203).send({ message: "pelicula agregada a Favoritos", favMovie })
    }

  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message)
  }
})

module.exports = router