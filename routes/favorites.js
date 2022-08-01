const { Router } = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { User } = require('../database/models')
const { FavMovie } = require('../database/models')

const router = Router()

router.get('/user/', verifyToken, async (req, res) => {
  const { id } = req.userVerification

  try {
    const favoriteMovies = await User.findOne({
      where: { id },
      attributes: ["username"],
      include: [{
        model: FavMovie,
        through: {
          attributes: []
        },
        attributes: ["name"]
      }]
    })

    res.status(200).send(favoriteMovies)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/add', verifyToken, async (req, res) => {
  const { id } = req.userVerification

  try {
    const [favMovie, created] = await FavMovie.findOrCreate({
      where: { name: req.body.name },
      defaults: { name: req.body.name },
      include: [User]
    })

    const user = await User.findOne({ where: { id } })
    await user.addFavMovie(favMovie)

    res.status(201).send({ message: "Película agregada a favoritos!" })

  } catch (error) {
    console.log(error);
    res.status(400).send(error.message)
  }
})

module.exports = router