import { useState, useEffect } from "react";
import { getWeatherData } from "./services/countries";

export const CountryComponent = ({ name, capital, area, languages, flags }) => {
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: "",
    wind: "",
    weatherIcon: "",
  });
  useEffect(() => {
    getWeatherData(capital).then((response) => {
      setWeatherInfo({
        temperature: response.data.main.temp,
        wind: response.data.wind.speed,
        weatherIcon: response.data.weather[0].icon,
      });
    });
  }, [capital]);

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
        <img
          style={{ height: "150px", width: "250px" }}
          src={flags}
          alt="flag"
        />
      </div>
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {weatherInfo.temperature} Celcius</p>
        <div>
          <img
            style={{ width: "150px", height: "150px" }}
            src={`https://openweathermap.org/img/wn/${weatherInfo.weatherIcon}@2x.png`}
            alt=""
          />
        </div>
        <p>wind {weatherInfo.wind}m/s</p>
      </div>
    </div>
  );
};
