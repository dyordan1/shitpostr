import {
    configureStore, ThunkAction, Action, 
} from "@reduxjs/toolkit";
import { uiSlice } from "./uiSlice";

const makeStore = () =>
    configureStore({
        reducer: { [uiSlice.name]: uiSlice.reducer },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const store = makeStore();