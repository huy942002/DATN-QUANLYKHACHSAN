import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '~/services/apiSevices';

export const getAllbill = createAsyncThunk('bill/getAllbill', () => {
    return http.httpGet('bill');
});

export const updatebill = createAsyncThunk('bill/update', (data) => {
    return http.httpPut(`bill/${data.id}`, data);
});

export const getBillById = createAsyncThunk('bill/getBillById', (id) => {
    return http.httpGet(`bill/${id}`);
});

const slice = createSlice({ 
    name: 'bill',
    initialState: {
        bills: [],
        bill: {},
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllbill.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllbill.fulfilled, (state, action) => {
            state.loading = false;
            state.bills = action.payload;
            state.error = '';
        });
        builder.addCase(getAllbill.rejected, (state, action) => {
            state.loading = false;
            state.bills = [];
            state.error = action.error.message;
        });

        builder.addCase(getBillById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBillById.fulfilled, (state, action) => {
            state.loading = false;
            state.bill = action.payload;
            state.error = '';
        });
        builder.addCase(getBillById.rejected, (state, action) => {
            state.loading = false;
            state.bill = {};
            state.error = action.error.message;
        });

        builder.addCase(updatebill.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updatebill.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.id) {
                state.bills = state.customers.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            }
            state.customers = state.customers.filter((x) => x.status === 1);
        });
        builder.addCase(updatebill.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },

});
export default slice.reducer;
