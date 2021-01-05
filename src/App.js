import React, { useState, useEffect } from 'react';
import { Select, FormControl, MenuItem,  } from '@material-ui/core';
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide")

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
          setCountries(countries)
        })
    };
    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    // console.log(countryCode)
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown" >
          <Select
            variant="outlined"
            onChange={onCountryChange}
            value={country}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
            {/* Menu Item default structure */}
            {/* <MenuItem value="abc" >OP1</MenuItem>
            <MenuItem value="abc" >OP2</MenuItem>
            <MenuItem value="abc" >OP1=3</MenuItem>
            <MenuItem value="abc" >OP4</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">

      </div>
    </div>
  );
}

export default App;


{/*#1 Header */ }
{/*#2 Title & select input drop down */ }
{/*#3 InfoBoxes */ }
{/*#4 InfoBoxes */ }
{/*#5 InfoBoxes */ }
{/*#6 Tables */ }
{/*#7 Graph */ }
{/*#8 Maps */ }
