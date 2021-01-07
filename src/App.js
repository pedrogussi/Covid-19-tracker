import React, { useState, useEffect } from 'react';
import { Select, FormControl, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Table from './Table';
import LineGraph from './LineGraph';
import Map from './Map';
import './App.css';
import { sortData, prettyPrintStat } from './util';
import 'leaflet/dist/leaflet.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

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

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data)
          setCountries(countries);
        })
    };
    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    // console.log(countryCode)
    // setCountry(countryCode)

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // setInputCountry(countryCode);
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      })
  };
  // console.log(countryInfo)


  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox onClick={(e) =>setCasesType('cases')} title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox onClick={(e) =>setCasesType('recovered')} title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox onClick={(e) =>setCasesType('deaths')} title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />

        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwile new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
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


// first day---> 2:14