import { useEffect, useState } from "react";
import { CountryComponent } from "./Country";
import { getAllCountries } from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCountryInfo, setDisplayCountryInfo] = useState(false);
  const [countryInfo, setCountryInfo] = useState([]);

  useEffect(() => {
    getAllCountries()
      .then((response) => setCountries(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    displayCountryInfo
      ? setDisplayCountryInfo(!displayCountryInfo)
      : setDisplayCountryInfo(displayCountryInfo);
    setSearchTerm(e.target.value);
  };
  const showCountryInfo = (data) => {
    setCountryInfo(data);
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
      {displayCountryInfo ? (
        <CountryComponent
          key={countryInfo.name.common}
          name={countryInfo.name.common}
          capital={countryInfo.capital}
          area={countryInfo.area}
          languages={countryInfo.languages}
          flags={countryInfo.flags.png}
        />
      ) : (
        <div>
          {countriesToShow.length < 10 ? (
            countriesToShow.map((data) => (
              <p key={data.name.common}>
                {data.name.common}{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDisplayCountryInfo(true);
                    showCountryInfo(data);
                  }}
                >
                  show
                </button>
              </p>
            ))
          ) : (
            <p>Too many matches,specify another filter</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
