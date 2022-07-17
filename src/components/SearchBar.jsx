import { Fragment, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { fetchCurrentWeatherInfo } from '../store/weather-actions';
import { weatherActions } from '../store/weather-slice';

const SearchBar = () => {
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const dispatch = useDispatch();

  const searchHandler = () => {
    if (!cityRef.current.value && !countryRef.current.value) return;
    const queryParams = {
      q: `${cityRef.current.value},${countryRef.current.value}`,
    };

    dispatch(fetchCurrentWeatherInfo(queryParams));
    dispatch(weatherActions.SET_HAS_ERROR(false));
  };

  const clearHandler = () => {
    cityRef.current.value = '';
    countryRef.current.value = '';
    dispatch(weatherActions.SET_HAS_ERROR(false));
    dispatch(weatherActions.SET_WEATHER_INFO({}));
  };

  const actionBtns = (
    <Fragment>
      <button onClick={searchHandler}>Search</button>
      <button onClick={clearHandler}>Clear</button>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="grid-cols-2 gap-3 font-normal sm:grid md:grid-cols-3">
        <div className="grid items-center grid-cols-3 my-4">
          <label htmlFor="city">City: </label>
          <input
            ref={cityRef}
            className="w-full col-span-2 px-3 py-1 ml-auto border border-gray-400 border-solid rounded outline-none focus:border-blue-500"
            id="city"
            type="text"
          />
        </div>
        <div className="grid items-center grid-cols-3 my-4">
          <label htmlFor="country">Country: </label>
          <input
            ref={countryRef}
            className="w-full col-span-2 px-3 py-1 ml-auto border border-gray-400 border-solid rounded outline-none focus:border-blue-500 "
            id="country"
            type="text"
          />
        </div>
        <div className="hidden grid-cols-2 gap-2 my-4 md:grid">
          {actionBtns}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 my-4 md:hidden">{actionBtns}</div>
    </Fragment>
  );
};

export default SearchBar;
