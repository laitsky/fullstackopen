const initialBlog = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
];

const initialUser = [
  {
    username: "Username 1",
    name: "Name 1",
    password: "pwpwd1",
  },
  {
    username: "Username 2",
    name: "Name 2",
    password: "pwpwd2",
  },
  {
    username: "Username 3",
    name: "Name 3",
    password: "pwpwd3",
  },
];
module.exports = { initialBlog, initialUser };
