const express = require('express')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

app.listen(process.env.PORT, () => {

  console.log(`Server listening in port: ${process.env.PORT}`)
})