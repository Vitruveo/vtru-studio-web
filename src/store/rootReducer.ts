import { userSlice } from "../features/user";
import { customizerSlice } from "../features/customizer";

export const reducer = {
  user: userSlice.reducer,
  customizer: customizerSlice.reducer,
};
