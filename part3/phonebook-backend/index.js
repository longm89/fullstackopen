require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
var morgan = require('morgan')
morgan.token('data', function (req, res) {
    return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')

})
app.get('/info', (request, response) => {
  let phonebookLength = 0
  Person.find({}).then(persons => {
    phonebookLength = persons.length
    response.send(`<div> Phonebook has info for ${phonebookLength} people </div> <div> ${new Date()} </div>`)
  })

})
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(
    person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))


})




app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {

      response.status(204).end()
    })
    .catch(error => next(error))

})
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person(
    {
      name: body.name,
      number: body.number
    }
  )

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const query = { name: body.name }

  Person.findOneAndUpdate(query, { number: body.number }, { new: true, runValidators: true, context: 'query' }, function (err, docs) {
    if (err) {
      next(err)
    } else {
      console.log('Updated. New doc:  ', docs)
      response.status(200).json(docs)
    }
  })
})
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})