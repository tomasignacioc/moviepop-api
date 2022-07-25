const { Router } = require('express')
const verifyToken = require('../middlewares/verifyToken')

const router = Router()

router.get('/movie/:id', (req, res) => {
  res.send("GET REVIEWS FROM MOVIE " + req.params.id)
})

router.post('/new', verifyToken, (req, res) => {

  res.send("agregado nuevo comentario")
})


module.exports = router