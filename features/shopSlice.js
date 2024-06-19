// shopSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { shopApi } from "../services/shopService";

export const shopSlice = createSlice({
    name: "shop",
    initialState: {
        products: [],
        categories: [],
        categorySelected: "",
        productSelected: "", // producto seleccionado por su id
        filteredProduct: []
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.categorySelected = action.payload;
            state.filteredProduct = state.products.filter(
                (product) => product.category === action.payload
            );
        },
        setProductSelected: (state, action) => {
            state.productSelected = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
            state.filteredProduct = state.products.filter(
                (product) => product.category === state.categorySelected
            );
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        }
    }
});

export const { setCategorySelected, setProductSelected, setProducts, setCategories } = shopSlice.actions;

export default shopSlice.reducer;
