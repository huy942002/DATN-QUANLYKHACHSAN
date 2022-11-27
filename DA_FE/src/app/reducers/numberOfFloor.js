import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '~/services/apiSevices';

// Generates pending, fulfilled and rejected action types

export const getAllNumberOfFloor = createAsyncThunk('number-of-floor/getAllNumberOfFloor', () => {
    return http.httpGet('number-of-floor');
});

export const getNumberOfFloorById = createAsyncThunk('number-of-floor/getNumberOfFloorById', (id) => {
    return http.httpGet(`number-of-floor/${id}`);
});

export const update = createAsyncThunk('number-of-floor/update', (data) => {
    return http.httpPut(`number-of-floor/${data.id}`, data);
});

export const add = createAsyncThunk('number-of-floor/add', (data) => {
    return http.httpPost('number-of-floor', data);
});

// Slice
const slice = createSlice({
    name: 'numberOfFloor',
    initialState: {
        numberOfFloors: [],
        numberOfFloor: {},
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        // getAllNumberOfFloor
        builder.addCase(getAllNumberOfFloor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllNumberOfFloor.fulfilled, (state, action) => {
            state.loading = false;
            state.numberOfFloors = action.payload.filter((x) => x.status === 1);
            state.error = '';
        });
        builder.addCase(getAllNumberOfFloor.rejected, (state, action) => {
            state.loading = false;
            state.numberOfFloors = [];
            state.error = action.error.message;
        });

        // getById
        builder.addCase(getNumberOfFloorById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNumberOfFloorById.fulfilled, (state, action) => {
            state.loading = false;
            state.numberOfFloor = action.payload;
            state.error = '';
        });
        builder.addCase(getNumberOfFloorById.rejected, (state, action) => {
            state.loading = false;
            state.numberOfFloor = {};
            state.error = action.error.message;
        });

        // update
        builder.addCase(update.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(update.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.id) {
                state.numberOfFloors = state.numberOfFloors.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            }
            state.numberOfFloors = state.numberOfFloors.filter((x) => x.status === 1);
        });
        builder.addCase(update.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // add
        builder.addCase(add.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(add.fulfilled, (state, action) => {
            state.loading = false;
            state.numberOfFloors.push(action.payload);
        });
        builder.addCase(add.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});
export default slice.reducer;
