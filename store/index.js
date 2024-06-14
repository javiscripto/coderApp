// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import shopReducer from "../features/shopSlice";
import cartReducer from "../features/cartSlice";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
    cart:cartReducer
  },
  
});
