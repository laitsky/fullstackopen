const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const newUser = {
        username: "test",
        name: "testing purpose",
        password: "roooooooot"
    }

    const result = await api.post("/api/users").send(newUser).expect(200)
    const testBlogs = []

    for (const blog  of helper.initialBlog) {
        blog['user'] = result.body.id
        testBlogs.push(blog)
    }
    const blogs = testBlogs.map(blog => new Blog(blog))
    const promiseArr = blogs.map(blog => blog.save())
    await Promise.all(promiseArr)
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
    const user = {
        username: "test",
        password: "roooooooot"
    }
    const loginResult = await api.post("/api/login").send(user)
    const token = `bearer ${loginResult.body.token}`

    const newBlog = {
        title: "Angular is cool, but React is cooler",
        author: "Everyone",
        url: "react-is-cool.com",
        likes: 100,
      }

     await api
        .post('/api/blogs')
        .set("Authorization", token)
        .send(newBlog)

    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(helper.initialBlog.length + 1)
    expect(res.body).toContainEqual(expect.objectContaining(newBlog))
})

test('if like property is missing, default the value to 0', async () => {
    const user = {
        username: "test",
        password: "roooooooot"
    }
    const loginResult = await api.post("/api/login").send(user)
    const token = `bearer ${loginResult.body.token}`
    const newBlog = {
        title: "Vue is cool, but React is cooler",
        author: "Everyone",
        url: "angular-is-cool.com",
      }

    const blog = await api.post('/api/blogs').set("Authorization", token).send(newBlog)
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

test('if token is not provided, return 401 Unauthorized', async () => {
    const newBlog = {
        title: "Vue is cool, but React is cooler",
        author: "Everyone",
        url: "angular-is-cool.com",
      }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})
afterAll(() => {
    mongoose.connection.close()
})