import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates with the right details when a new blog is created', () => {
  const createNewBlog = jest.fn()
  const component = render(
    <BlogForm createNewBlog = {createNewBlog}/>
  )
  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const likes = component.container.querySelector('#likes')

  fireEvent.change(title, {
    target: { value: 'a new post' }
  })
  fireEvent.change(author, {
    target: { value: 'Long' }
  })
  fireEvent.change(url, {
    target: { value: 'https://fullstackopen.com/' }
  })
  fireEvent.change(likes, {
    target: { value: 12345 }
  })
  fireEvent.submit(form)
  expect(createNewBlog.mock.calls).toHaveLength(1)
  const correctBlog =
    { 'title': 'a new post', 'author': 'Long', 'url': 'https://fullstackopen.com/', 'likes': '12345' }
  expect(createNewBlog.mock.calls[0][0]).toEqual(correctBlog)

})