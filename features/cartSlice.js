import { createSlice } from "@reduxjs/toolkit";

export const cartSlice= createSlice({
    name:"cart",
    initialState:{
        value:{
            user:null,
            total:0,
            items:[],
            
        }
    },
    reducers:{
        setCartUser:(state, action)=>{
            state.value.user= action.payload.data.localId
        },
        addProduct: (state, action) => {
            const product = action.payload;
            const existingProd = state.value.items.find(
                prod => prod.id === product.id
            );
            if (existingProd) {
                existingProd.quantity++;
            } else {
                state.value.items.push({ ...product, quantity: 1 });
            }
            state.value.total = state.value.items.reduce(
                (total, item) => total + item.price * item.quantity, 0
            );
        },
        
        deleteProductById: (state, action) => {
            const id = action.payload;
            const removedProduct = state.value.items.find(
                item => item.id === id
            );
            state.value.items = state.value.items.filter(
                item => item.id !== id
            );
            state.value.total -= removedProduct.price * removedProduct.quantity;
        },
        deleteCart:(state)=>{
            state.value.items=[];
        },
     
        

    }
});


export const {setCartUser, addProduct, deleteProductById , deleteCart , setOrders } = cartSlice.actions

export default cartSlice.reducer