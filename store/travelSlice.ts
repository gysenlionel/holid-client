import { createSlice, AnyAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { format } from "date-fns";
import { diff } from "jsondiffpatch";

// Type for our state
export interface TravelState {
  isLoadingTravelState: boolean;
  destinationState: string | null;
  datesState: string;
  optionsState: string;
}

const endNewDate = new Date()
const endDate = endNewDate.setDate(endNewDate.getDate() + 1)
// Initial state
const initialState: TravelState = {
  isLoadingTravelState: false,
  destinationState: null,
  datesState: JSON.stringify({
    startDate: format(new Date(), "dd-MM-yyyy"),
    endDate: format(endDate, "dd-MM-yyyy")
  })
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
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      // return {
      //   ...state,
      //   ...action.payload.travel,
      // };
      // Check is data change in server side if not use state. 
      // To not merge state with initial value when we use Link in next.js
      const stateDiff = diff(state, action.payload);
      const isdiff1 = stateDiff?.server?.[0]?.travel;
      state = isdiff1 ? action.payload.server.travel : state;
    })
    // Use this to reload my state by action.payload if i use thunk and fetch data. 
    // builder.addCase(TestFetch.fulfilled, (state,action:AnyAction) =>  {
    //   state = action.payload.travel;
    // })
  },


});

export const { setisLoadingTravelState, setDestinationState, setDatesState, setOptionsState } = travelSlice.actions;

export const selectisLoadingTravelState = (state: AppState): boolean => state.travel.isLoadingTravelState;
export const selectDestinationState = (state: AppState): string => state.travel.destinationState;
export const selectDatesState = (state: AppState): string => state.travel?.datesState;
export const selectOptionsState = (state: AppState): string => state.travel?.optionsState;

export default travelSlice.reducer;