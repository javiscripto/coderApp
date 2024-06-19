// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import shopReducer from "../features/shopSlice";
import cartReducer from "../features/cartSlice";
import { shopApi } from "../services/shopService";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
    [shopApi.reducerPath]:shopApi.reducer,    
    cart:cartReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(shopApi.middleware)
  
});


setupListeners(store.dispatch)