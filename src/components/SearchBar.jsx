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
    dispatch(weatherActions.SET_WEATHER_INFO({}));
    dispatch(fetchCurrentWeatherInfo(queryParams));
    dispatch(weatherActions.SET_HAS_ERROR(false));
  };

  const clearHandler = () => {
    cityRef.current.value = '';
    countryRef.current.value = '';
    dispatch(weatherActions.SET_HAS_ERROR(false));
  };

  const actionBtns = (
    <Fragment>
      <button onClick={searchHandler}>Search</button>
      <button onClick={clearHandler}>Clear</button>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="sm:grid grid-cols-2 md:grid-cols-3 gap-3 font-normal">
        <div className="grid grid-cols-3 my-4 items-center">
          <label htmlFor="city">City: </label>
          <input
            ref={cityRef}
            className="border border-solid border-gray-400 rounded col-span-2 ml-auto py-1 px-3 w-full outline-none  focus:border-blue-500"
            id="city"
            type="text"
          />
        </div>
        <div className="grid grid-cols-3 my-4 items-center">
          <label htmlFor="country">Country: </label>
          <input
            ref={countryRef}
            className="border border-solid border-gray-400 rounded col-span-2 ml-auto py-1 px-3 w-full outline-none  focus:border-blue-500 "
            id="country"
            type="text"
          />
        </div>
        <div className="hidden my-4  md:grid grid-cols-2 gap-2">
          {actionBtns}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 my-4 md:hidden">{actionBtns}</div>
    </Fragment>
  );
};

export default SearchBar;
