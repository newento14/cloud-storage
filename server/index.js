require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/index')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const path = require('path')
const error = require('./middlewares/error.middleware')
const corsMiddleware = require('./middlewares/cors.middleware')

const PORT = process.env.PORT || 8888
const app = express()

app.use(express.json())
app.use(corsMiddleware)
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}))
app.use('/api', router);
app.use(error);

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