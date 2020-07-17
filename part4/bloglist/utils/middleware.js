const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

  module.exports = {errorHandler}