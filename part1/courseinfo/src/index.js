import React from 'react'
import ReactDOM from 'react-dom'
const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  )
}
const Part = ({name, exercises}) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises1} />
      <Part name={parts[1].name} exercises={parts[1].exercises2} />
      <Part name={parts[2].name} exercises={parts[2].exercises3} />
    </div>
  )
}
const Total = ({parts}) => {
  return (
    <p>Number of exercises {parts[0].exercises1 + parts[1].exercises2 + parts[2].exercises3}
    </p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises1: 10
      },
      {
        name: 'Using props to pass data',
        exercises2: 7
      },
      {
        name: 'State of a component',
        exercises3: 14
      }
    ] 
  }

  return (

    <div>
      <Header courseName = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
  
}

ReactDOM.render(<App />, document.getElementById('root'))