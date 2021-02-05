import React, { useEffect, useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios"
import personService from "./services/persons"
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

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
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        let id = persons[indexFound].id
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
      }
    } else {
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
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