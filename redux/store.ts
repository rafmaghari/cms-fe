import { configureStore } from '@reduxjs/toolkit'
import appReducer from "@/redux/features/appSlice";
import authReducer from "@/redux/features/authSlice";
import {apiSlice} from "@/redux/services/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        app: appReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV ! === 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch