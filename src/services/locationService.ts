import WeatherApi from '../apis/WeatherApi';

export type Location = {
  name: string;
  lat: number;
  lon: number;
};

async function loadLocations(
  query: string,
  limit: number = 1
): Promise<Location[]> {
  const { data } = await WeatherApi.get(
    `/geo/1.0/direct?q=${query}&limit=${limit}`
  );
  return data;
}

const locationService = {
  loadLocations,
};

export default locationService;
