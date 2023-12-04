import { createSlice } from "@reduxjs/toolkit";

import { roleCreateThunk, roleUpdateThunk } from "./thunks";
import { RoleSliceState } from "./types";

const initialState: RoleSliceState = {
  name: "",
  description: "",
  permissions: [],
  status: "",
  error: "",
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** BUILDER ROLE CREATE THUNK */
    builder.addCase(roleCreateThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(roleCreateThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(roleCreateThunk.rejected, (state, action) => {
      state.status = "failed";

      state.error = action.error.message || "";
    });
  },
});

export const roleActionsCreators = roleSlice.actions;
