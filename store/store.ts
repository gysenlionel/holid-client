import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  Store,
} from "@reduxjs/toolkit";
import { travelSlice } from "./travelSlice";
import { createWrapper } from "next-redux-wrapper";
import { listenerMiddleware } from "./middleware";

export interface State {
  travel: any;
}

const rootReducer = combineReducers({
  [travelSlice.name]: travelSlice.reducer,
});

export const storeServer = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false
  })
})

export const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return storeServer;
  } else {

    let store: any = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        listenerMiddleware.middleware
      ],
      devTools: process.env.NODE_ENV !== "production",
    });
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<Store<State>>(makeStore);