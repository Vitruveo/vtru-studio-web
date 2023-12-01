import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { userAuthThunk } from "./thunks";
import { UserSliceState } from "./types";

const initialState: UserSliceState = {
  token,
  name,
  email,
  status,
  error,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userAuthThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        userAuthThunk.fulfilled,
        (state, action: PayloadAction<YourData[]>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(
        userAuthThunk.rejected,
        (state, action: PayloadAction<string>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const userActionsCreators = userSlice.actions;
