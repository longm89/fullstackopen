const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})
blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})
module.exports = blogsRouter