import React from "react"
const Person = ({name, number}) => {
    return (
      <div>
        {name} {number}
      </div>
    )
  }
  
  
const Persons = (props) => {
    return (
      <div>
      {props.personsToShow.map(person => 
        <Person name = {person.name} number = {person.number} key = {person.name}/>)
      }
      </div>
    )
  }
export default Persons