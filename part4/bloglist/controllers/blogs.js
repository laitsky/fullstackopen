const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const user = await User.findById(request.body.userId)

  if (!request.body.title && !request.body.url) {
    return response.status(400).end();
  }

  if (!request.body.likes) {
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: 0,
      user: user._id
    });
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id)
    return response.status(201).json(result);
  } else {
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user._id
    })
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id)
    return response.status(201).json(result);
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put("/:id", async (req, res) => {
  const {likes} = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {likes}, {new: true})
  res.status(200).json(updatedBlog)
})
module.exports = blogsRouter;