import { configureStore } from '@reduxjs/toolkit';

import historyReducer from './history-slice';
import weatherReducer from './weather-slice';

const store = configureStore({
  reducer: {
    history: historyReducer,
    weather: weatherReducer,
  },
});

export default store;
