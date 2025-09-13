import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loginUser as loginApi, registerUser as registerApi } from '../../services';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('authToken'),
    isAuthenticated: !!localStorage.getItem('authToken'),
    loading: false,
    error: null,
};

// Login async thunk - FIXED
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginApi(credentials);
            console.log("The login data we get inside SLICE", response);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

// Register async thunk - FIXED
export const registerUser = createAsyncThunk(
    'auth/register',
    async (
        payload: { firstName: string; middleName?: string; lastName: string; email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await registerApi({ ...payload, role: 'user' });
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('authToken');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{
            success: boolean;
            message: string;
            status: number;
            data: { token: string }
        }>) => {
            state.loading = false;
            // Extract token from action.payload.data.token
            state.token = action.payload.data.token;
            state.isAuthenticated = true;
            localStorage.setItem('authToken', action.payload.data.token);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Register
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<{
            success: boolean;
            message: string;
            status: number;
            data: { token: string }
        }>) => {
            state.loading = false;
            // Extract token from action.payload.data.token
            state.token = action.payload.data.token;
            state.isAuthenticated = true;
            localStorage.setItem('authToken', action.payload.data.token);
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;