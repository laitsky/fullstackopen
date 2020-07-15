const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.title && !request.body.url) {
    return response.status(400).end();
  }

  if (!request.body.likes) {
    const blog = new Blog({
      ...request.body,
      likes: 0,
    });
    const result = await blog.save();
    return response.status(201).json(result);
  } else {
    const blog = new Blog(request.body);
    const result = await blog.save();
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