import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Redux'
export const Store = configureStore({
    reducer: {
        users: userReducer
    }
})