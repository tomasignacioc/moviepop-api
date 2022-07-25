const { Router } = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require('../database/models')

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(400).send("No existe un usuario asociado a ese email")

    const passwordCheck = await bcrypt.compare(password, user.password)
    if (!passwordCheck) {

      return res.status(400).send("Contraseña incorrecta")
    } else {
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)

      return res.header("auth-token", token).send({ message: "logueado con exito", token })
    }

  } catch (error) {

    return res.status(400).send(error.message)
  }
})

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const emailExists = await User.findOne({ where: { email } })
    if (emailExists) {
      return res.status(400).send("El email ya está siendo utilizado")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })

    return res.status(201).send({ mensaje: "usuario creado!", data: user })
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message)
  }
})

module.exports = router