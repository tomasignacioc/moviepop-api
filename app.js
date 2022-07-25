const express = require('express')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes/index')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

app.listen(port, () => {

  console.log(`Server listening in port: ${port}`)
})