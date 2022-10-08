import { useState } from 'react';
import { useQuery } from 'react-query';
import forecastService, { Weather } from '../services/forecastService';
import { FORECAST } from './keys';

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const useForecast = (): {
  forecast: Weather[];
  setLat: (lat?: number) => void;
  setLon: (lon?: number) => void;
} => {
  const [lat, setLat] = useState<number>();
  const [lon, setLon] = useState<number>();

  const { data: forecast = [] } = useQuery(
    [FORECAST, lat, lon],
    () => forecastService.loadForecast(lat, lon),
    {
      enabled: lat != null && lon != null,
    }
  );

  const aggregateForecast = forecast.reduce((acc, curr) => {
    const datePart = curr.dt_txt.split(' ')[0];
    const currentWeekdayIndex = new Date(datePart).getDay();
    const todayWeekdayIndex = new Date().getDay();
    const dt_txt =
      currentWeekdayIndex === todayWeekdayIndex
        ? 'Today'
        : WEEKDAYS[currentWeekdayIndex];
    const dateIndex = acc.findIndex((el) => el.dt_txt === dt_txt);
    if (dateIndex === -1) {
      return [...acc, { dt_txt, main: curr.main }];
    }
    acc[dateIndex] = {
      ...acc[dateIndex],
      main: {
        temp_max:
          curr.main.temp_max > acc[dateIndex].main.temp_max
            ? curr.main.temp_max
            : acc[dateIndex].main.temp_max,
        temp_min:
          curr.main.temp_min < acc[dateIndex].main.temp_min
            ? curr.main.temp_min
            : acc[dateIndex].main.temp_min,
      },
    };
    return acc;
  }, [] as Weather[]);

  return { forecast: aggregateForecast, setLat, setLon };
};

export default useForecast;
