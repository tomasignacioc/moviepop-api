const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
  const token = req.header("auth-token")
  if (!token) return res.status(401).send("no tienes permiso para realizar esta acción")

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, { maxAge: '1h' })
    req.userVerification = verified
    next()
  } catch (error) {
    return res.status(400).send("Token invalido")
  }
}

// faltaria agregar un middleware para eliminar el token