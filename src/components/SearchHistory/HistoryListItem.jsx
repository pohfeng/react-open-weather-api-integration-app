import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';

import { FiSearch, FiTrash2 } from 'react-icons/fi';

import { fetchCurrentWeatherInfo } from '../../store/weather-actions';
import { historyActions } from '../../store/history-slice';

const HistoryListItem = ({ id, index, name, country, logTime }) => {
  const dispatch = useDispatch();

  const countryCode = country ? `, ${country}` : '';
  const location = `${name}${countryCode}`;

  const searchHandler = () => {
    const queryParams = {
      q: location,
    };
    dispatch(fetchCurrentWeatherInfo(queryParams));
  };

  const deleteHistoryHandler = () => {
    dispatch(historyActions.DELETE_HISTORY({ id }));
  };

  return (
    <Fragment>
      <div className="flex items-center  my-4">
        <div className="grid grid-cols-4 items-center">
          <p>{`${index + 1}.`}</p>
          <p className="text-left col-span-3">{location}</p>
        </div>
        <p className="ml-auto mr-4">
          {DateTime.fromISO(logTime).toLocaleString(DateTime.TIME_WITH_SECONDS)}
        </p>
        <button onClick={searchHandler} className="rounded-full mx-1">
          <FiSearch />
        </button>
        <button onClick={deleteHistoryHandler} className="rounded-full mx-1">
          <FiTrash2 />
        </button>
      </div>
      <hr />
    </Fragment>
  );
};

export default HistoryListItem;
