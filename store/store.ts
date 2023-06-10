import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  Store,
} from "@reduxjs/toolkit";
import { travelSlice } from "./travelSlice";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'

export interface State {
  travel: boolean;
}

const rootReducer = combineReducers({
  [travelSlice.name]: travelSlice.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
        }),
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
  
    return makeConfiguredStore();
  } else {

    const persistConfig = {
      key: "nextjs",
      whitelist: ["travel"], // make sure it does not clash with server keys
      storage:storageSession,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    let store: any = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
    });

    store.__persistor = persistStore(store); // Nasty hack

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