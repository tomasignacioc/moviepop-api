const { Router } = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require('../database/models')

const router = Router()

router.post('/login', async (req, res) => {

  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(400).send({ error: "No existe un usuario asociado a ese email" })
    }

    const passwordCheck = await bcrypt.compare(password, user.password)
    if (!passwordCheck) {

      return res.status(400).send({ error: "Contraseña incorrecta" })
    } else {
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

      return res.header("Auth-Token", token).send({ success: "logueado con exito", token, username: user.username })
    }

  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
})

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const emailExists = await User.findOne({ where: { email } })
    if (emailExists) {
      return res.status(400).send({ error: "El email ya está siendo utilizado" })
    }

    const usernameExists = await User.findOne({ where: { username } })
    if (usernameExists) {
      return res.status(400).send({ error: "El nombre de usuario ya está siendo utilizado" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })

    return res.status(201).send({ success: "usuario creado!", data: user })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.message })
  }
})

module.exports = router