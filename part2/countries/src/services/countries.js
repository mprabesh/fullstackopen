import axios from "axios";

const allCountriesURL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const API_KEY = "a3d79902f419b3a8154c88036e5a16a7";

export const getAllCountries = () => {
  return axios.get(allCountriesURL);
};

export const getWeatherData = (capital) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`
  );
};
