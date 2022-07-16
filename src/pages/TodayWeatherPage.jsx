import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

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
      <h1 className="text-left text-lg font-semibold ">Today's Weather</h1>
      <hr />
      <section>
        <SearchBar />
        {!isWeatherInfoEmpty && <WeatherInfo />}
        {hasError && <SearchError />}
      </section>
      <section className="transition ease-in-out duration-300 transform">
        <HistoryList />
      </section>
    </Fragment>
  );
};

export default TodayWeatherPage;
