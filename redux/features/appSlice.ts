import { createSlice } from "@reduxjs/toolkit";

type AppState = {
    isSidebarOpen: boolean
}

const initialState: AppState = {
    isSidebarOpen: false
} as AppState

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleSideBar: state => {
            state.isSidebarOpen = !state.isSidebarOpen
        },

    }
})

export const { toggleSideBar} = appSlice.actions;
export default appSlice.reducer;
