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

test('unique identifier id is exist', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined();
})

test('HTTP POST request to /api/blogs is successful', async () => {
    const newBlog = {
        title: "Angular is cool, but React is cooler",
        author: "Everyone",
        url: "react-is-cool.com",
        likes: 100,
      }

     await api
        .post('/api/blogs')
        .send(newBlog)

    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(helper.initialBlog.length + 1)
    expect(res.body).toContainEqual(expect.objectContaining(newBlog))
})

test('if like property is missing, default the value to 0', async () => {
    const newBlog = {
        title: "Vue is cool, but React is cooler",
        author: "Everyone",
        url: "angular-is-cool.com",
      }

    const blog = await api.post('/api/blogs').send(newBlog)
    expect(blog.body).toHaveProperty("likes", 0)
})

test('if title and url are missing, respond with status 400', async () => {
    const newBlog = {
        author: "Angelo",
      }
    
    await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})