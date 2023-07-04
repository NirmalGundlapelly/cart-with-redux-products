import { combineReducers,configureStore, } from "@reduxjs/toolkit";
import cartSlice from './slices/cartSlice'

// assume that the counter slice will be combined with other slices

// create the store from the combined reducer



const store = configureStore({
    reducer: {
      cart: cartSlice
    }
});

export default store;

// typescript type for the combined state
export type RootState = ReturnType<typeof store.getState>