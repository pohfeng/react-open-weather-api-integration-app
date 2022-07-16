import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTimeoutFn } from 'react-use';
import { DateTime } from 'luxon';
import { BigNumber } from 'bignumber.js';
import { Transition } from '@headlessui/react';

// use big number for calculation accuracy
const kelvinToCelciusConverter = (number) => {
  const temperature = new BigNumber(number);
  return temperature.minus(273.15).decimalPlaces(2);
};

const WeatherInfo = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);

  const weatherInfo = useSelector((state) => state.weather.weatherInfo);
  const generalInfo = weatherInfo?.weather ? weatherInfo?.weather[0] : {};
  const mainInfo = weatherInfo.main;

  const iconUrl = `${import.meta.env.VITE_OPEN_WEATHER_API_ICON_URL}${
    generalInfo.icon
  }.png`;

  const country = weatherInfo?.sys?.country
    ? `, ${weatherInfo.sys.country}`
    : '';
  const location = `${weatherInfo.name}${country}`;

  const minTemperature = kelvinToCelciusConverter(mainInfo.temp_min);
  const maxTemperature = kelvinToCelciusConverter(mainInfo.temp_max);

  useEffect(() => {
    setIsShowing(false);
    resetIsShowing();
  }, [weatherInfo]);

  return (
    // <Transition
    //   appear={true}
    //   show={isShowing}
    //   enter="transition ease-linear duration-300 transform"
    //   enterFrom="-translate-x-full opacity-0"
    //   enterTo="translate-x-0 opacity-100"
    //   leave="transition ease-linear duration-300 transform"
    //   leaveFrom="translate-x-0 opacity-100"
    //   leaveTo="-translate-x-full opacity-0"
    // >
    <div className="mx-10">
      <div className="text-left">{location}</div>
      <div className="flex items-center">
        <strong className="text-3xl">{generalInfo.main}</strong>
        <img src={iconUrl} alt="weather-icon" />
      </div>

      <table className="table-auto text-left border-collapse">
        <tbody>
          <tr>
            <th>Description: </th>
            <td className="pl-2">{generalInfo.description}</td>
          </tr>
          <tr>
            <th>Temperature: </th>
            <td className="pl-2">
              <span>{minTemperature.toFixed(2)}</span>
              <span>&#8451;</span>
              <span> ~ {maxTemperature.toFixed(2)}</span>
              <span>&#8451;</span>
            </td>
          </tr>
          <tr>
            <th>Humidity: </th>
            <td className="pl-2">
              <span>{mainInfo.humidity}</span>
              <span>%</span>
            </td>
          </tr>
          <tr>
            <th>Time: </th>
            <td className="pl-2">
              <span>
                {DateTime.fromSeconds(weatherInfo.dt).toFormat(
                  'yyyy-LL-dd hh:mm a'
                )}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeatherInfo;
