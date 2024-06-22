// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import shopReducer from "../features/shopSlice";
import cartReducer from "../features/cartSlice";
import authReducer from "../features/authSlice"
import { shopApi } from "../services/shopService";
import { authAPI } from "../services/authService";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
    [shopApi.reducerPath]:shopApi.reducer,    
    cart:cartReducer,
    auth:authReducer,
    [authAPI.reducerPath]:authAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(shopApi.middleware).concat(authAPI.middleware)

  
});


setupListeners(store.dispatch)