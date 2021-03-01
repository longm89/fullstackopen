import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}
const createNew = async (content) => {
  const object = {content, votes: 0}
  const response = await axios.post(baseUrl, object)
  console.log('After adding to the server, the data is', response.data)
  return response.data
}
const update = async (newUpdate) => {
  console.log(newUpdate)
  const response = await axios.put(`${baseUrl}/${newUpdate.id}`, newUpdate)
  return response.data
}
export default {getAll, createNew, update}