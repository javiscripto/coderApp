import { createSlice } from "@reduxjs/toolkit";
import products from "../data/data.json";



const filterCategories=[... new Set(products.map(prod=>{
    return prod.category})
)]
const categories=[...filterCategories, "todos los productos"]

export const shopSlice = createSlice({
    name:"shop",
    initialState:{
        products,
        categories,
        categorySelected:"",
        productSelected:"",//producto selecionado por su id
        filteredProduct:[]

    },
    reducers:{
        setCategorySelected:(state,action)=>{
            state.categorySelected=action.payload
            state.filteredProduct=state.products.filter(
                (product)=>product.category===action.payload
            )
        },
        setProductSelected:(state, action)=>{
            state.productSelected=action.payload
        },
        
    }
});

export const {setCategorySelected, setProductSelected }=shopSlice.actions

export default shopSlice.reducer;