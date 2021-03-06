import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash-es';

import SearchBar from '../components/SearchBar';
import SearchError from '../components/SearchError';
import WeatherInfo from '../components/WeatherInfo';
import HistoryList from '../components/SearchHistory/HistoryList';

const TodayWeatherPage = () => {
  const weatherInfo = useSelector((state) => state.weather.weatherInfo);
  const hasError = useSelector((state) => state.weather.hasError);
  const isWeatherInfoEmpty = isEmpty(weatherInfo);

  return (
    <Fragment>
      <h1 className="text-lg font-semibold text-left ">Today's Weather</h1>
      <hr />
      <section>
        <SearchBar />
        {!isWeatherInfoEmpty && <WeatherInfo />}
        {hasError && <SearchError />}
      </section>
      <section className="transition duration-300 ease-in-out transform">
        <HistoryList />
      </section>
    </Fragment>
  );
};

export default TodayWeatherPage;
