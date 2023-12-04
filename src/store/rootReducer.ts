import { combineReducers } from "@reduxjs/toolkit";

import { userSlice } from "../features/user";
import { customizerSlice } from "../features/customizer";
import { roleSlice } from "../features/role";

export const reducer = combineReducers({
  user: userSlice.reducer,
  customizer: customizerSlice.reducer,
  role: roleSlice.reducer,
});
