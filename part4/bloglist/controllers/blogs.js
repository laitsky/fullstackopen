const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require('jsonwebtoken')

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.title && !request.body.url) {
    return response.status(400).end();
  }

  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  return response.status(201).json(result);
});

blogsRouter.delete("/:id", async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }

  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() === decodedToken.id.toString()) {
    await blog.remove()
    res.status(204).end()
  } else {
    res.status(401).end()
  }
})

blogsRouter.put("/:id", async (req, res) => {
  const {likes} = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {likes}, {new: true})
  res.status(200).json(updatedBlog)
})
module.exports = blogsRouter;