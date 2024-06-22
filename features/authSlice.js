import { createSlice } from "@reduxjs/toolkit";
export const authSlice= createSlice({
    name:"auth",
    initialState:{
        value:{
            user:null,
            userName:null,
            token:null,
            profileImage:null
        }
    },

    reducers:{
        setUser:(state, action)=>{
            state.value.user= action.payload.data.email
            state.value.token= action.payload.data.idToken
            state.value.userName=action.payload.data.displayName
        },
        setProfileImage:(state, action)=>{
            state.value.profileImage=action.payload
        },
        clearUser:(state)=>{
            state.value.user=null
            state.value.token= null
        },


    },
});

export const {setUser,clearUser}= authSlice.actions

export default authSlice.reducer;



