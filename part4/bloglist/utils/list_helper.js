const dummy = blogs => 1;

const totalLikes = blogs => blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = blogs => {
    const target = Math.max(...blogs.map(blog => blog.likes))
    const blog = blogs.find(blog => blog.likes === target)
    const {title, author, likes} = blog
    return {title, author, likes}
}

module.exports = {dummy, totalLikes, favoriteBlog}