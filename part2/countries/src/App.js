import React, { useEffect, useState } from "react"
import './App.css';
import axios from 'axios'

const Country = ({ country }) => {
  const ImageStyle = {
    marginTop: "1rem",
    width: "10rem",
  }
  if (country === null) {
    return null
  }
  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      {country.languages.map(language => <div key={language.name}>{language.name}</div>)}
      <img src={country.flag} alt="Flag" style={ImageStyle}></img>
    </div>
  )
}
const Countries = (props) => {
  const [show, setShow] = useState(null)
  // show is the name of the country that will be shown
  if (props.countries === null) {
    return (
      <p>
        Could not find any result
      </p>
    )
  }
  if (props.countries.length === 0) {
    return null
  }

  if (props.countries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
  if (props.countries.length > 1 && props.countries.length < 11) {
    return (
      <div>
        {props.countries.map(country => <li key={country.name}> {country.name}
          <button onClick={() => setShow(country.name)}> Show </button>
          <Country country={show === country.name ? country : null} />
        </li>
        )}
      </div>
    )
  }
  if (props.countries.length === 1) {
    let country = props.countries[0]
    return (
      <Country country={country} />
    )
  }
  return null
}

function App() {

  const [newFilter, setNewFilter] = useState("")
  const [countries, setNewCountries] = useState([])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  const hook = () => {
    if (newFilter !== "") {
      const baseUrl = `https://restcountries.eu/rest/v2/name/${newFilter}`
      axios
        .get(baseUrl)
        .then(response => {
          const listCountries = response.data.length <= 11 ? response.data : response.data.slice(0, 11)
          setNewCountries(listCountries)
          console.log(listCountries)
        })
        .catch(error => {
          setNewCountries(null)
        })
    }


  }

  useEffect(hook, [newFilter])
  return (
    <div>
      <form>
        <label>
          Find countries
          <input onChange={handleFilterChange}></input>
        </label>
      </form>
      <Countries countries={countries} />
    </div>
  );
}

export default App;
