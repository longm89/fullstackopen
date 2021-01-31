import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({heading, anec, numOfVotes}) => {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{anec}</p>
      <p>has {numOfVotes} votes</p>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick = {handleClick}>{text}</button>
  )
}

function App({anecdotes}) {
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(new Array(anecdotes.length).fill(0))
  const [maxIndex, setMaxIndex] = useState(0)

  const randomAnec = () => {
    // find a new random index for the next anecdote

    function getRandomInt(max) {
      //Return a random integer number between 0 and max
      return Math.floor(Math.random() * Math.floor(max))
    }

    let newIndex
    
    do {
      newIndex = getRandomInt(anecdotes.length - 1)
    } while (newIndex === selected)

    setSelected(newIndex)
  }

  const vote = () => {
    // increase the point for the current anecdote: points[selected] is increased by 1
    const copy = [...points]
    copy[selected] += 1
    setPoint(copy)
    if (copy[selected] > copy[maxIndex]) {
      setMaxIndex(selected)
    }
  }

  return (
    <div>
      <Display heading="Anecdote of the day" anec={anecdotes[selected]} numOfVotes={points[selected]} />
      <Button handleClick = {vote} text = "vote"/>
      <Button handleClick = {randomAnec} text = "next anecdote"/>
      <Display heading="Anecdote with most votes" anec={anecdotes[maxIndex]} numOfVotes={points[maxIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)