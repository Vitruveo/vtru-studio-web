import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState, ReduxDispatch } from "@/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: ReduxDispatch;
  rejectValue: string;
}>();
