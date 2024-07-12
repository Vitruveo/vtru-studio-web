import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
    selectedFilter: string;
}

const initialState: FiltersState = {
    selectedFilter: 'all',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            state.selectedFilter = action.payload;
        },
    },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
