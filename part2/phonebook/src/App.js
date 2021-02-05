import React, { useEffect, useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"
import "./App.css"

const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification" style={style}>
      {message}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')
  const successfulStyle = {
    borderRadius: "10px",
    padding: "0.5rem",
    border: "1px solid green",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "green",
    backgroundColor: "antiquewhite",
    marginBottom: "1rem"
  }
  const failureStyle = {
    borderRadius: "10px",
    padding: "0.5rem",
    border: "1px solid red",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "red",
    backgroundColor: "antiquewhite",
    marginBottom: "1rem"
  }
  const [notification, setNotification] = useState({ message: null, style: successfulStyle })

  const hook = () => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    //prevent the submit from default handling of the form
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const isEqual = (element) => element.name === newName
    const indexFound = persons.findIndex(isEqual)
    if (indexFound !== -1) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ? `)
      if (result) {
        let id = persons[indexFound].id
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNotification({ message: "Updated " + returnedPerson.name, style: successfulStyle })

            setTimeout(() => { setNotification({ message: null, style: successfulStyle }) }, 3000)
          })
          .catch(error => {
            setNotification({
              message: "Information of " + newName + " has already been removed from the server.",
              style: failureStyle
            })
            setPersons(persons.filter(person => person.id !== id))
            setTimeout(() => { setNotification({ message: null, style: successfulStyle }) }, 3000)
          })
      }
    } else {
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setNotification({ message: "Added " + returnedPerson.name, style: successfulStyle })
          setTimeout(() => { setNotification({ message: null, style: successfulStyle }) }, 3000)
        })
    }



  }

  const deletePerson = (props) => {
    const result = window.confirm(`Delete ${props.name} ?`)
    if (!result) {
      return
    }

    personService.deletePerson(props.id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== props.id))
        setNotification({ message: "Deleted " + props.name, style: successfulStyle })
        setTimeout(() => { setNotification({ message: null, style: successfulStyle }) }, 3000)
      })
      .catch(error => {
        setNotification({ message: "Information of " + props.name + " has already been removed from the server.", style: failureStyle })
        setPersons(persons.filter(person => person.id !== props.id))
        setTimeout(() => { setNotification({ message: null, style: failureStyle }) }, 3000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterWord(event.target.value)
  }
  function containFilter(person, filter) {
    let lowerCaseName = person.name.toLowerCase()
    let lowerCaseFilter = filter.toLowerCase()
    return lowerCaseName.indexOf(lowerCaseFilter) !== -1
  }
  const personsToShow = persons.filter(person => containFilter(person, filterWord))
  //define the personsToShow to be a list of people to show, depending on the filter
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} style={notification.style} />
      <Filter filterWord={filterWord} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App