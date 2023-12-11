import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';

import { websocketSlice } from '@/features/ws';

import { userSlice } from '../features/user';
import { customizerSlice } from '../features/customizer';
import { roleSlice } from '../features/role';

interface RootState {
  user: ReturnType<typeof userSlice.reducer>;
  customizer: ReturnType<typeof customizerSlice.reducer>;
  role: ReturnType<typeof roleSlice.reducer>;
  websocket: ReturnType<typeof websocketSlice.reducer>;
}

const appReducer = combineReducers<RootState>({
  user: userSlice.reducer,
  customizer: customizerSlice.reducer,
  role: roleSlice.reducer,
  websocket: websocketSlice.reducer,
});

export const reducer: Reducer<RootState, AnyAction> = (state: RootState | undefined, action: AnyAction) => {
  if (state && action.type === 'user/logout') {
    state.websocket.connection?.close();
    state = undefined;
  }

  return appReducer(state, action);
};
