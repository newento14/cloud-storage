require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/index')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 8888
const app = express()

app.use(express.json())
app.use(fileUpload({}))
app.use(cors({
  origin: process.env.CLIENT_URL,
}))

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()