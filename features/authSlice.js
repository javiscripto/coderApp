import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      user: {
        userName: null,
        email: null,
        localId: null,
        photo: null,
      },
      orders: [],
      wishlist:[], 
      token: null,
      profileImage: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value.user.email = action.payload.email;
      state.value.user.localId = action.payload.localId;
      state.value.token = action.payload.idToken;
      state.value.user.userName = action.payload.displayName;
    },
    setProfileImage: (state, action) => {
      state.value.profileImage = action.payload;
    },
    setUserPhoto: (state, action) => {
      state.value.user.photo = action.payload;
    },
    setOrders: (state, action) => {
        const ordersObject = action.payload;
        const ordersArray = Object.entries(ordersObject).map(([key, value]) => ({
          id: key,
          ...value
        }));
        state.value.orders = ordersArray;
      },
    setWishList : (state, action)=>{
      const whishListArray= Object.entries(action.payload).map(([key, value])=>({
        id:key,
        ...value
      }));
      state.value.wishlist=whishListArray;
    },
    clearUser: (state) => {
      state.value = {
        user: {
          email: null,
          localId: null,
          userName: null,
          photo: null,
        },
        token: null,
        profileImage: null,
        orders: [],
      };
    },
  },
});

export const { setUser, setProfileImage, setUserPhoto, setOrders, setWishList, clearUser } = authSlice.actions;

export default authSlice.reducer;
