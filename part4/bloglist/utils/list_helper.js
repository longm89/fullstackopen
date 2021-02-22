const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item
  return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let result = {}
  let maxLikes = 0
  for (let i = 0; i < blogs.length; i++) {
    if (maxLikes < blogs[i].likes) {
      maxLikes = blogs[i].likes
      result = { title: blogs[i].title, author: blogs[i].author, likes: blogs[i].likes }
    }
  }
  return result
}
module.exports = {
  dummy, totalLikes, favoriteBlog
}