import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { Transition } from '@headlessui/react';

import { FiSearch, FiTrash2 } from 'react-icons/fi';

import { fetchCurrentWeatherInfo } from '../../store/weather-actions';
import { historyActions } from '../../store/history-slice';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const HistoryListItem = ({ id, index, name, country, logTime }) => {
  const dispatch = useDispatch();
  const [isShowing, setIsShowing] = useState(true);

  const countryCode = country ? `, ${country}` : '';
  const location = `${name}${countryCode}`;

  const searchHandler = () => {
    const queryParams = {
      q: location,
    };
    dispatch(fetchCurrentWeatherInfo(queryParams));
  };

  const deleteHistoryHandler = async () => {
    setIsShowing(false);
    await delay(300);
    dispatch(historyActions.DELETE_HISTORY({ id }));
  };

  return (
    <Transition
      appear={true}
      show={isShowing}
      enter="transition ease-linear duration-300 transform"
      enterFrom="-translate-x-full opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="transition ease-linear duration-300 transform"
      leaveFrom="translate-x-0 opacity-100"
      leaveTo="-translate-x-full opacity-0"
    >
      <div className="flex items-center my-4">
        <div className="flex items-center text-left ">
          <p className="w-6">{`${index + 1}.`}</p>
          <p className="col-span-4">{location}</p>
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
    </Transition>
  );
};

export default HistoryListItem;
