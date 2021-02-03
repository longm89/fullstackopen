import React, { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterWord, setFilterWord] = useState('')

  const addPerson = (event) => {
    //prevent the submit from default handling of the form
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    const isEqual = (element) => element.name === newName 

    if (persons.findIndex(isEqual) !== -1) {
      alert(`${newName} is already added to phonebook`)
      return 
    }

    setPersons(persons.concat(nameObject))
    setNewName("")
    setNewNumber("")
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
  function containFilter (person, filter) {
    let lowerCaseName = person.name.toLowerCase()
    let lowerCaseFilter = filter.toLowerCase()
    return lowerCaseName.indexOf(lowerCaseFilter) !== -1
  }
  const personsToShow = persons.filter(person => containFilter(person, filterWord))
    //define the personsToShow to be a list of people to show, depending on the filter
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterWord = {filterWord} handleFilter = {handleFilter}/>
      <h3>add a new</h3>
        <PersonForm 
          addPerson ={addPerson} 
          newName = {newName} 
          handleNameChange = {handleNameChange}
          newNumber = {newNumber} 
          handleNumberChange = {handleNumberChange}
        />
      <h3>Numbers</h3>
        <Persons personsToShow = {personsToShow}/>
    </div>
  )
}

export default App