import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';

import { weatherActions } from './weather-slice';
import { historyActions } from './history-slice';

// use thunk for api calls
export const fetchCurrentWeatherInfo = (queryParams) => {
  return async (dispatch) => {
    const apiUrl = import.meta.env.VITE_OPEN_WEATHER_API_URL;
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
    const searchParams = new URLSearchParams(queryParams);
    const url = `${apiUrl}?${searchParams}&appid=${apiKey}`;

    const response = await fetch(url);
    const info = await response.json();

    if (response.ok) {
      // add history log
      const historyObj = {
        id: nanoid(),
        name: info.name,
        country: info.sys.country,
        logTime: DateTime.now().toISO(),
      };
      dispatch(historyActions.ADD_HISTORY(historyObj));
      dispatch(weatherActions.SET_WEATHER_INFO(info));
    } else {
      // handle location not found
      dispatch(weatherActions.SET_WEATHER_INFO({}));
      dispatch(weatherActions.SET_HAS_ERROR(true));
    }
  };
};
