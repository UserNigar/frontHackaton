// src/store/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {browser} from "globals";

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

const BASE_URL = 'http://172.16.1.111:5092/api';

// Utility to extract error messages
const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || error.message || 'Something went wrong';
    }
    return 'Unexpected error';
};

// ---------------------- Thunks ----------------------

// Get Profile
export const getProfile = createAsyncThunk(
    'auth/getProfile',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/User/me`, {withCredentials: true});
            console.log(res)
            // return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (data, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/User/register`, data, { withCredentials: true });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Login
export const login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/User/login`, data, { withCredentials: true });
            // setCookie("refreshToken", res.data.refreshToken, 2)
            // setCookie("accessToken", res.data.accessToken, 2)
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Logout
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Send OTP
export const sendOTP = createAsyncThunk(
    'auth/sendOTP',
    async (email, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/send-otp`, { email });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// ---------------------- Slice ----------------------

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Signup failed';
            })

            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Login failed';
            })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload ?? 'Logout failed';
            })

            // Send OTP
            .addCase(sendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOTP.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'OTP failed';
            })

            // Get Profile
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch profile';
            });
    },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;