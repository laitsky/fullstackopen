const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const user = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const result = await user.find({}).populate('blogs')

    res.json(result)
})

usersRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body
    if (password.length < 3) {
        return res.status(400).json({error: 'password should be at least 3 characters'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

module.exports = usersRouter