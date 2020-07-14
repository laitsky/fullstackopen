const blog = require("../models/blog");

const dummy = blogs => 1;
const totalLikes = blogs => blogs.reduce((total, blog) => total + blog.likes, 0)
const favoriteBlog = blogs => {
    const target = Math.max(...blogs.map(blog => blog.likes))
    const blog = blogs.find(blog => blog.likes === target)
    const {title, author, likes} = blog
    return {title, author, likes}
}
const mostBlogs = blogs => {
  const target = blogs.reduce((acc, blog) => {
    let found = acc.find(found => found.author === blog.author)

    if (!found) {
      return acc.concat({author: blog.author, blogs: 1})
    }

    found.blogs++;
    return acc;
  }, []);

  return target.reduce((acc, blog) => acc.blogs > blog.blogs ? acc : blog);
}

const mostLikes = blogs => {
  const target = blogs.reduce((acc, blog) => {
    let found = acc.find(found => found.author === blog.author)
    if (!found) {
      return acc.concat({author: blog.author, likes: blog.likes})
    };
  
    found.likes = found.likes + blog.likes;
    return acc;
  }, []);

  return favoriteBlog(target);
}
module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}