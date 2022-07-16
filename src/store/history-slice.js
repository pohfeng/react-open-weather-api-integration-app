import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  histories: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    SET_HISTORIES(state, action) {
      state.histories = action.payload;
    },
    ADD_HISTORY(state, action) {
      state.histories.unshift(action.payload);
    },
    DELETE_HISTORY(state, action) {
      state.histories = state.histories.filter(
        (history) => history.id !== action.payload.id
      );
    },
  },
});

export const historyActions = historySlice.actions;

export default historySlice.reducer;
