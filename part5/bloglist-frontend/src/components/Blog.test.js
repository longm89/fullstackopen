import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
let component
const mockHandler = jest.fn()
const blog = {
  title: 'a new blog',
  author: 'Long',
  url: 'vnexpress.net',
  likes: 123,
  user: {
    username: 'long1',
    name: 'Long1',
    id: '12dfsdlkf23klsdf'
  },
  id: '1ksdfjlkj3k434'
}

beforeEach(() => {
  component = render (
    <Blog blog = {blog} addLike = {mockHandler}/>
  )
})

test('render content', () => {
  expect(component.container).toHaveTextContent(
    'a new blog'
  )
  expect(component.container).toHaveTextContent(
    'Long'
  )
  expect(component.queryByText(
    'vnexpress.net'
  )).toBeNull()
  expect(component.queryByText(
    '123'
  )).toBeNull()
})

test('Clicking the button shows the blog\'s url and number of likes ', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.getByText(
    'vnexpress.net'
  )).toBeDefined()
  expect(component.getByText(
    '123'
  )).toBeDefined()
})
test('Click the button like twice, the event handler the component received is called twice', () => {




  const button1 = component.getByText('view')
  fireEvent.click(button1)
  const button2 = component.getByText('like')
  fireEvent.click(button2)
  fireEvent.click(button2)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
