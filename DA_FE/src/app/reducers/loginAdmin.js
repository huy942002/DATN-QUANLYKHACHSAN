import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '~/services/apiSevices';

// Generates pending, fulfilled and rejected action types

export const post = createAsyncThunk('auth/login', (data) => {
    return http.httpPost('auth/login', data);
});

// Slice
const slice = createSlice({
    name: 'loginAdmin',
    initialState: {
        tokens: '',
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        // post
        builder.addCase(post.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(post.fulfilled, (state, action) => {
            state.loading = false;
            state.tokens = localStorage.getItem('token');
        });
        builder.addCase(post.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});
export default slice.reducer;
