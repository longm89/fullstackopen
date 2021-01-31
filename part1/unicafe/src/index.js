import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value, suffix}) => {
  return (
    <tr>
      <td>
        {text}
      </td>

      <td>
        {value} {suffix}
      </td>
     </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  function average(good, neutral, bad) {
    let result = (good * 1 + neutral * 0 + bad * (-1))/(good + neutral + bad);
    return result.toFixed(2);
  }
  
  function positive(good, neutral, bad) {
    let result = good/(good + bad + neutral) * 100;
    return result.toFixed(2);
  
  }

  function all(good, neutral, bad) {
    return good + neutral + bad;
  }

  if (good === 0 & neutral === 0 & bad ===0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text = "good" value = {good} suffix = ""/>
        <Statistic text = "neutral" value = {neutral} suffix = ""/>
        <Statistic text = "bad" value = {bad} suffix = ""/>
        <Statistic text = "all" value = {all(good, neutral, bad)} suffix = ""/>
        <Statistic text = "average" value = {average(good, neutral, bad)} suffix = ""/>
        <Statistic text = "positive" value = {positive(good, neutral, bad)} suffix = "%"/>
      </tbody>
    </table>
  )
}
const Button = ({handleClick, text}) => {
  return (
    <button onClick = {handleClick}>{text}</button>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {() => setGood(good + 1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral + 1)} text = "neutral" />
      <Button handleClick = {() => setBad(bad + 1)} text = "bad"/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)