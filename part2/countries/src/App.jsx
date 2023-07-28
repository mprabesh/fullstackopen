import { useEffect, useState } from "react";
import axios from "axios";

const CountryComponent = ({ name, capital, area, languages, flags }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <div style={{ marginBottom: "20px" }}>
        <h3>languages:</h3>
        <ul>
          {languages
            ? Object.values(languages).map((val) => <li key={val}>{val}</li>)
            : null}
        </ul>
      </div>
      <div>
        <img src={flags} alt="flag" />
      </div>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => setCountries(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const countriesToShow = countries.filter((val) => {
    return searchTerm.length === 0
      ? true
      : val.name.common.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div>
      <div>
        find countries <input onChange={handleChange} />
      </div>

      <div>
        {countriesToShow.length < 10 ? (
          countriesToShow.map((data) => (
            <CountryComponent
              key={data.name.common}
              name={data.name.common}
              capital={data.capital}
              area={data.area}
              languages={data.languages}
              flags={data.flags.png}
            />
          ))
        ) : (
          <p>Too many matches,specify another filter</p>
        )}
      </div>
    </div>
  );
};

export default App;
