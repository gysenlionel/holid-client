import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { format } from "date-fns";

// Type for our state
export interface TravelState {
  isLoadingTravelState: boolean;
  destinationState: string | null;
  datesState: string;
  optionsState: string;
}

// Initial state
const initialState: TravelState = {
  isLoadingTravelState: false,
  destinationState: null,
  datesState: JSON.stringify({ startDate: format(new Date(), "dd-MM-yyyy"),
    endDate: format(new Date(), "dd-MM-yyyy")})
  ,
  optionsState: JSON.stringify({
    adult: 1,
    children: 0,
    room: 1,
  })
};

// Actual Slice
export const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    // Action to set the travel data
    setisLoadingTravelState(state, action) {
      state.isLoadingTravelState = action.payload;
    },
    setDestinationState(state, action) {
      state.destinationState = action.payload;
    },
    setDatesState(state, action) {
      state.datesState = action.payload;
    },
    setOptionsState(state, action) {
      state.optionsState = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.travel,
      };
    },
  },
});

export const { setisLoadingTravelState, setDestinationState, setDatesState, setOptionsState } = travelSlice.actions;

export const selectisLoadingTravelState = (state: AppState) => state.travel.isLoadingTravelState;
export const selectDestinationState = (state: AppState) => state.travel.destinationState;
export const selectDatesState = (state: AppState) => state.travel.datesState;
export const selectOptionsState = (state: AppState) => state.travel.optionsState;

export default travelSlice.reducer;