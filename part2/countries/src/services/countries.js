import axios from "axios";

export const getAllCountries = () => {
  return axios.get(import.meta.env.VITE_API_ROUTE);
};

export const getWeatherData = (capital) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${
      import.meta.env.VITE_API_KEY
    }&units=metric`
  );
};
