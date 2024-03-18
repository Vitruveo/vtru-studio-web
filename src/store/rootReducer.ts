import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';

import webSocketService from '@/services/websocket';
import { websocketSlice } from '@/features/ws';

import { userSlice } from '../features/user';
import { consignArtworkSlice } from '../features/consignArtwork';
import { customizerSlice } from '../features/customizer';
import { assetSlice } from '@/features/asset';

interface RootState {
    user: ReturnType<typeof userSlice.reducer>;
    consignArtwork: ReturnType<typeof consignArtworkSlice.reducer>;
    customizer: ReturnType<typeof customizerSlice.reducer>;
    websocket: ReturnType<typeof websocketSlice.reducer>;
    asset: ReturnType<typeof assetSlice.reducer>;
}

const appReducer = combineReducers<RootState>({
    user: userSlice.reducer,
    consignArtwork: consignArtworkSlice.reducer,
    customizer: customizerSlice.reducer,
    websocket: websocketSlice.reducer,
    asset: assetSlice.reducer,
});

export const reducer: Reducer<RootState, AnyAction> = (state: RootState | undefined, action: AnyAction) => {
    if (state && action.type === 'user/logout') {
        webSocketService?.disconnect();
        state = undefined;
    }

    return appReducer(state, action);
};
