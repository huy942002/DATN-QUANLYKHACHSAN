import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '~/services/apiSevices';

// Generates pending, fulfilled and rejected action types

export const getAllKindOfRoom = createAsyncThunk('KindOfRoom/getAllKindOfRoom', () => {
    return http.httpGet('kind-of-room');
});

// export const deleteById = createAsyncThunk('personnel/deleteById', (id) => {
//     return http.httpDelete('personnel', id);
// });

// Slice
const slice = createSlice({
    name: 'kindOfRoom',
    initialState: {
        kindOfRoom: [],
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        // getAllPersonnel
        builder.addCase(getAllKindOfRoom.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllKindOfRoom.fulfilled, (state, action) => {
            state.loading = false;
            state.kindOfRoom = action.payload;
            state.error = '';
        });
        builder.addCase(getAllKindOfRoom.rejected, (state, action) => {
            state.loading = false;
            state.kindOfRoom = [];
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
    },
});
export default slice.reducer;
