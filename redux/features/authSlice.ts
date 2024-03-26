import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    isAuthenticated: boolean,
    isLoading: boolean
}

const initialState : AuthState= {
    isAuthenticated: false,
    isLoading: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: state => {
            state.isAuthenticated = true;
        },
        logout: state => {
            state.isAuthenticated = false
        },
        finishInitialLoading: state => {
            state.isLoading = false
        }
    }
})

export const { setAuth, logout, finishInitialLoading } = authSlice.actions;
export default authSlice.reducer