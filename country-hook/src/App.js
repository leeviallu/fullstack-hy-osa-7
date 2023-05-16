import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
      const fetchCountries = async () => {
        if (!(name === '')) {
          try {
              const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true
                `)
              console.log('d',response)
              if(!response) {
                throw new Error()
              }
              const countriesData = response.data[0]
              const foundData = {
                ...countriesData,
                found: true,
              }
              setCountry(foundData)
          }
          catch (error) {
            if(error.code === 'ERR_BAD_REQUEST') {
              console.error(error.code, ': Wrong country name')
            }
          }
        }
      }
      fetchCountries()
  }, [name])
  return country
}

const Country = ({ country }) => {
  console.log(country)
  if (!country) {
    return (
      null
    )
  }
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }


  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App