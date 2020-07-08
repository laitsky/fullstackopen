import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState([])
  const [keyword, setKeyword] = useState('');
  const weatherApiUrl = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=`;
  const handleKeywordChange = e => setKeyword(e.target.value);
  const handleShowBtnClick = country => () => setKeyword(country);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data));
  }, []);

  const countriesFilter = keyword
    ? countries.filter(c => c.name.toLowerCase().includes(keyword.trim().toLowerCase()))
    : countries;
  const getWeatherInfo = capital => {
    axios
      .get(weatherApiUrl + capital)
      .then(res => setWeather(res.data.current));
  }

  const countriesToShow = () => {
    if (!keyword) {
      return '';
    } else if (countriesFilter.length >= 10) {
      return 'Too many matches, specify another filter';
    } else if (countriesFilter.length === 1) {
      return countriesFilter.map(c => {
        getWeatherInfo(c.capital);
        return (
          <div key={c.alpha2Code}>
            <h1>{c.name}</h1>
            <div>capital {c.capital}</div>
            <div>population {c.population}</div>
            <h2>languages</h2>
            <ul>
              {c.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={c.flag} alt={c.name + " flag"} title={c.name + " flag"} width="150px" />
            <h2>Weather in {c.capital}</h2>
            <p><strong>temperature: </strong> {weather.temperature} Celcius</p>
            <img src={weather.weather_icons} />
        <p><strong>wind: </strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
          </div>
        )
      })
    } else {
      return countriesFilter.map(c => (
        <div key={c.alpha2Code}>{c.name} <button onClick={handleShowBtnClick(c.name)}>show</button></div>
      ))
    }
  };

  return (
    <div>
      find countries <input value={keyword} onChange={handleKeywordChange} /> <br />
      {countriesToShow()}
    </div>
  )
}

export default App;
