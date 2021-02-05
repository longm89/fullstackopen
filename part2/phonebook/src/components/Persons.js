import React from "react"
const Person = ({ name, number, deletePerson }) => {
  return (
    <div>
      {name} {number}
      <button onClick={deletePerson}> delete</button>
    </div>
  )
}


const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map(person =>
        <Person
          name={person.name}
          number={person.number}
          key={person.name}
          deletePerson={() => props.deletePerson(person)}
        />)
      }
    </div>
  )
}
export default Persons