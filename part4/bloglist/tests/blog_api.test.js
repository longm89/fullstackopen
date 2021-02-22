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
    "likes": "12"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})