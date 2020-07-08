import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [keyword, setKeyword] = useState('');

  const handleKeywordChange = e => setKeyword(e.target.value);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data));
  }, []);

  const countriesFilter = keyword
    ? countries.filter(c => c.name.toLowerCase().includes(keyword.trim().toLowerCase()))
    : countries;

  const countriesToShow = () => {
    if (!keyword) {
      return '';
    } else if (countriesFilter.length >= 10) {
      return 'Too many matches, specify another filter';
    } else if (countriesFilter.length === 1) {
      return countriesFilter.map(c => (
        <div key={c.alpha2Code}>
          <h1>{c.name}</h1>
          <div>capital {c.capital}</div>
          <div>population {c.population}</div>
          <h3>languages</h3>
          <ul>
            {c.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
          </ul>
          <img src={c.flag} alt={c.name + " flag"} title={c.name + " flag"} width="150px" />
        </div>
      ))
    } else {
      return countriesFilter.map(c => <div key={c.alpha2Code}>{c.name}</div>)
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
