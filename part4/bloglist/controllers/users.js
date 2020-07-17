const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const user = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const result = await user.find({})

    res.json(result)
})

usersRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        password   
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

module.exports = usersRouter