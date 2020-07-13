const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('connected to MongoDB'))
    .catch(err => logger.error(err.message));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/blogs', blogsRouter)

module.exports = app