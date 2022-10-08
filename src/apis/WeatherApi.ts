import axios from 'axios';

const WeatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: process.env.REACT_APP_API_KEY,
  },
});

export default WeatherApi;
