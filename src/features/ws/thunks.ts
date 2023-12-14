// actions.js
import { CombinedState, createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

import { websocketSlice } from '.';
import { WebsocketSliceState } from './types';
import { createAppAsyncThunk } from '@/store/asyncThunk';

export const connectWebSocketThunk = createAsyncThunk<void, undefined>('websocket/connect', async (_, { dispatch }) => {
  const WS_SERVER_URL = `ws://localhost:${3000}`;
  const socket = io(WS_SERVER_URL);

  dispatch(websocketSlice.actions.websocketConnected(socket));
});

export const loginWebSocketThunk = createAppAsyncThunk<void, { _id: string }>(
  'websocket/login',
  async ({ _id }, { getState }) => {
    const socket = (
      getState() as CombinedState<{
        websocket: WebsocketSliceState;
      }>
    ).websocket.connection!;

    const creator = getState().user;

    socket.emit('login', {
      id: creator._id,
      email: creator.login.email,
      token: 'creator',
    });

    socket.on('preSignedURL', (data) => {
      console.log(`preSignedURL: ${JSON.stringify(data)}`);
    });
  },
);
