import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '~/services/apiSevices';

// Generates pending, fulfilled and rejected action types

export const getAllDetailsInvoice = createAsyncThunk('detail-invoice/getAllDetailsInvoice', () => {
    return http.httpGet('detail-invoice');
});

// Slice
const slice = createSlice({
    name: 'detailsInvoice',
    initialState: {
        detailsInvoices: [],
        totalRoomPrice: 0,
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        // getAllDetailsInvoice
        builder.addCase(getAllDetailsInvoice.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllDetailsInvoice.fulfilled, (state, action) => {
            state.loading = false;
            state.detailsInvoice = action.payload.filter((x) => x.status === 1);
            state.detailsInvoice
                .filter((x) => x.bills.status === 1)
                .map((x) => {
                    x.rentalTypes.id === 1
                        ? (state.totalRoomPrice += x.rooms.kindOfRoom.priceByDay)
                        : (state.totalRoomPrice += x.rooms.kindOfRoom.hourlyPrice);
                });
            state.error = '';
        });
        builder.addCase(getAllDetailsInvoice.rejected, (state, action) => {
            state.loading = false;
            state.serviceDetails = [];
            state.error = action.error.message;
        });
    },
});
export default slice.reducer;
