const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [{
  "title": "a first post",
  "author": "Long Mai",
  "url": "sdfsdf",
  "likes": "43"
},
  {
    "title": "a second post",
    "author": "Long Mai",
    "url": "sdf",
    "likes": "4"
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('all blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    "title": "a new post",
    "author": "David",
    "url": "sdfdsfsd",
    "likes": 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  newBlog['id'] = response.body[initialBlogs.length]['id']

  expect(response.body).toContainEqual(newBlog)
})
describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const response = await Blog.find({})
    const blogsAtStart = response.map(blog => blog.toJSON())
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const response2 = await Blog.find({})
    const blogsAtEnd = response2.map(blog => blog.toJSON())
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})
afterAll(() => {
  mongoose.connection.close()
})