import WeatherApi from '../apis/WeatherApi';

export type Weather = {
  dt_txt: string;
  main: {
    temp_max: number;
    temp_min: number;
  };
};

async function loadForecast(lat?: number, lon?: number): Promise<Weather[]> {
  const { data } = await WeatherApi.get(
    `/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}`
  );
  return data?.list;
}

const forecastService = {
  loadForecast,
};

export default forecastService;
