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
import { middleware } from "./middleware";

export const reduxStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;

export type ReduxStore = typeof reduxStore;
export type AppState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: ReduxDispatch;
  rejectValue: string;
}>();
