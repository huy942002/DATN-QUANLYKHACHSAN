import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '~/services/apiSevices';

// Generates pending, fulfilled and rejected action types

export const getAllNumberOfFloors = createAsyncThunk('numberOfFloors/getAllNumberOfFloors', () => {
    return http.httpGet('number-of-floor');
});

export const getByIdNumberOfFloors = createAsyncThunk('numberOfFloors/getByIdNumberOfFloors', (id) => {
    return http.httpGet(`number-of-floor/${id}`);
});

export const getByIdNumberOfFloorslast = createAsyncThunk('numberOfFloors/getByIdNumberOfFloorslast', () => {
    return http.httpGet(`number-of-floor/last`);
});

export const AddNBF = createAsyncThunk('numberOfFloors/AddNBF', (data) => {
    return http.httpPost('number-of-floor', data);
});

export const AddNBFop = createAsyncThunk('numberOfFloors/AddNBF', (data) => {
    return http.httpPost(`number-of-floor/${data.sl}`, data.NumberOfFloorss);
});

// export const deleteById = createAsyncThunk('personnel/deleteById', (id) => {
//     return http.httpDelete('personnel', id);
// });

// Slice
const slice = createSlice({
    name: 'numberOfFloor',
    initialState: {
        numberOfFloors: [],
        NumberOfFloor: {},
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        // getAllPersonnel
        builder.addCase(getAllNumberOfFloors.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllNumberOfFloors.fulfilled, (state, action) => {
            state.loading = false;
            state.numberOfFloors = action.payload;
            state.error = '';
        });
        builder.addCase(getAllNumberOfFloors.rejected, (state, action) => {
            state.loading = false;
            state.numberOfFloors = [];
            state.error = action.error.message;
        });

        // deleteById
        // builder.addCase(deleteById.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(deleteById.fulfilled, (state, action) => {
        //     state.loading = false;
        //     if (action.payload.id) {
        //         state.personnel = state.personnel.filter((item) => item.id !== action.payload.id);
        //     }
        // });
        // builder.addCase(deleteById.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.error.message;
        // });

        builder.addCase(getByIdNumberOfFloors.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getByIdNumberOfFloors.fulfilled, (state, action) => {
            state.loading = false;
            state.numberOfFloor = action.payload;
            state.error = '';
        });
        builder.addCase(getByIdNumberOfFloors.rejected, (state, action) => {
            state.loading = false;
            state.numberOfFloor = {};
            state.error = action.error.message;
        });

        builder.addCase(AddNBF.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(AddNBF.fulfilled, (state, action) => {
            state.loading = false;
            state.numberOfFloors.push(action.payload);
        });
        builder.addCase(AddNBF.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        builder.addCase(getByIdNumberOfFloorslast.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getByIdNumberOfFloorslast.fulfilled, (state, action) => {
            state.loading = false;
            state.NumberOfFloor = action.payload;
            state.error = '';
        });
        builder.addCase(getByIdNumberOfFloorslast.rejected, (state, action) => {
            state.loading = false;
            state.NumberOfFloor = {};
            state.error = action.error.message;
        });
    },
});
export default slice.reducer;
