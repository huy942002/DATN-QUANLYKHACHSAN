import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '~/services/apiSevices';

// Generates pending, fulfilled and rejected action types

export const getAllHandOverBill = createAsyncThunk('hand-over-bill/getAllHandOver', () => {
    return http.httpGet('bill');
});

// Slice
const slice = createSlice({
    name: 'handOverBill',
    initialState: {
        bills: [],
        error: '',
        totalCash: 0,
        totalCard: 0,
        totalDeposits: 0,
        loading: false,
    },
    extraReducers: (builder) => {
        // getAllHandOver
        builder.addCase(getAllHandOverBill.pending, (state) => {
            state.totalCash = 0;
            state.totalCard = 0;
            state.totalDeposits = 0;
            state.loading = true;
        });
        builder.addCase(getAllHandOverBill.fulfilled, (state, action) => {
            const now = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .slice(0, 19);
            const dateOfLogin = '2022-10-13T00:00:00';
            state.loading = false;
            state.bills = action.payload.filter((x) => x.status === 1);
            state.bills
                .filter((x) => dateOfLogin <= x.hireDate && x.checkOutDay <= now)
                .map((x) => (state.totalCash += x.totalCash));
            state.bills
                .filter((x) => dateOfLogin <= x.hireDate && x.checkOutDay <= now)
                .map((x) => (state.totalCard += x.totalCard));
            state.bills
                .filter((x) => dateOfLogin <= x.hireDate && x.checkOutDay <= now)
                .map((x) => (state.totalDeposits += x.deposits));
            state.error = '';
        });
        builder.addCase(getAllHandOverBill.rejected, (state, action) => {
            state.loading = false;
            state.bills = [];
            state.error = action.error.message;
        });
    },
});
export default slice.reducer;
