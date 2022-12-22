import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '~/services/apiSevices';

export const getAllPaymentType = createAsyncThunk('paymenttype/getAllPaymentType', () => {
    return http.httpGet('payment-type');
});

const slice = createSlice({ 
    name: 'paymenttype',
    initialState: {
        paymenttypes: [],
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPaymentType.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllPaymentType.fulfilled, (state, action) => {
            state.loading = false;
            state.paymenttypes = action.payload;
            state.error = '';
        });
        builder.addCase(getAllPaymentType.rejected, (state, action) => {
            state.loading = false;
            state.paymenttypes = [];
            state.error = action.error.message;
        });


    },

});
export default slice.reducer;
