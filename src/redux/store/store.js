import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../reducers/authSlice'
import eventReducer from '../reducers/EventSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventReducer
    }
})