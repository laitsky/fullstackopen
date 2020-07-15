const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlog[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlog[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlog[2])
    await blogObject.save()
})

describe("blog list returns the correct amount of blogs posts in the JSON format", () => {
    test('200 OK json format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('corect amount of blog posts', async () => {
        const res = await api.get('/api/blogs')

        expect(res.body).toHaveLength(helper.initialBlog.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})