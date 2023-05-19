import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface TravelState {
  travelState: boolean;
}

// Initial state
const initialState: TravelState = {
  travelState: false,
};

// Actual Slice
export const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    // Action to set the authentication status
    setTravelState(state, action) {
      state.travelState = action.payload;
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

export const { setTravelState } = travelSlice.actions;

export const selectTravelState = (state: AppState) => state.travel.travelState;

export default travelSlice.reducer;