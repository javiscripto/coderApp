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
      token: null,
      profileImage: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value.user.email = action.payload.data.email;
      state.value.user.localId = action.payload.data.localId;
      state.value.token = action.payload.data.idToken;
      state.value.user.userName = action.payload.data.displayName;
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

export const { setUser, setProfileImage, setUserPhoto, setOrders, clearUser } = authSlice.actions;

export default authSlice.reducer;
