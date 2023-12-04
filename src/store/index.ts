import {
  configureStore,
  createAsyncThunk,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";

import { reducer } from "./rootReducer";

export const store = configureStore({
  reducer,
});

export type Store = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export default store;
