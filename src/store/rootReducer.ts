import { combineReducers } from "@reduxjs/toolkit";

import { userSlice } from "../features/user";
import { customizerSlice } from "../features/customizer";

export const reducer = combineReducers({
  user: userSlice.reducer,
  customizer: customizerSlice.reducer,
});
