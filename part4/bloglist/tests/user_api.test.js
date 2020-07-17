const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    let userObject = new User(helper.initialUser[0])
    await userObject.save()
    userObject = new User(helper.initialUser[1])
    await userObject.save()    
    userObject = new User(helper.initialUser[2])
    await userObject.save()
})

describe("user list returns the correct amount of blogs posts in the JSON format", () => {
    test('200 OK json format', async () => {
        await api
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })

    test('correct amount of users', async () => {
        const res = await api.get('/api/users')
        expect(res.body).toHaveLength(helper.initialUser.length)
    })
})

describe("fullstackopen part 4 exercise 4.16 tests implementation", () => {
    test('invalid users are not created', async () => {
        const newUser = {
            username: 'O',
            name: 'Kajbjer Alesund',
            password: 'xSJ29z!s'
        }

        await api
                .post('/api/users')
                .send(newUser)

        const res = await api.get('/api/users')
        expect(res.body.length).toBe(helper.initialUser.length)
    })

    test('invalid add user operations return suitable status code and error message', async () => {
        const newUser = {
            username: 'O',
            name: 'Kajbjer Alesund',
            password: 'xSJ29z!s'
        }

        await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
    })
})
afterAll(() => {
    mongoose.connection.close()
})