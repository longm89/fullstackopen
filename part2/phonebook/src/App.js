import React, { useState } from 'react'

const Person = ({name, number}) => {
  return (
    <div>
      {name} {number}
    </div>
  )
}
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: "040-1234567"}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) => {
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
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
        <div>
          name: <input value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>number: <input value = {newNumber} onChange = {handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <Person name = {person.name} number = {person.number} key = {person.name}/>)}
    </div>
  )
}

export default App