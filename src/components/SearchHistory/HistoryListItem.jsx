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
        <div className="flex items-center mr-auto text-left sm:mr-0">
          <p className="w-6">{`${index + 1}.`}</p>
          <p className="col-span-4">{location}</p>
        </div>
        <p className="hidden ml-auto mr-4 sm:block">
          {DateTime.fromISO(logTime).toLocaleString(DateTime.TIME_WITH_SECONDS)}
        </p>
        <button onClick={searchHandler} className="mx-1 rounded-full">
          <FiSearch />
        </button>
        <button onClick={deleteHistoryHandler} className="mx-1 rounded-full">
          <FiTrash2 />
        </button>
      </div>
      <hr />
    </Transition>
  );
};

export default HistoryListItem;
