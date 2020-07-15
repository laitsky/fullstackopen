const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
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

module.exports = blogsRouter;
