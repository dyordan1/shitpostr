import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface UiState {
  drawerOpen: boolean;
}

const initialState: UiState = { drawerOpen: false };

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleDrawer(state) {
            state.drawerOpen = !state.drawerOpen;
        },
        openDrawer(state) {
            state.drawerOpen = true;
        },
        closeDrawer(state) {
            state.drawerOpen = false;
        },
    },
});

export const {
    openDrawer, closeDrawer, toggleDrawer,
} = uiSlice.actions;

export const getDrawerOpen = (state: AppState) => state.ui.drawerOpen;

export default uiSlice.reducer;