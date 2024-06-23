import { createSlice } from "@reduxjs/toolkit";
export const authSlice= createSlice({
    name:"auth",
    initialState:{
        value:{
            user:null,
            userName:null,
            localId: null,
            token:null,
            profileImage:null
        }
    },
    reducers:{
        setUser:(state, action)=>{
            state.value.user= action.payload.data.email
            state.value.localId= action.payload.data.localId
            state.value.token= action.payload.data.idToken
            state.value.userName=action.payload.data.displayName
        },
        setProfileImage:(state, action)=>{
            state.value.profileImage=action.payload
        },
        clearUser:(state)=>{
            state.value.user=null
            state.value.token= null
            state.value.localId=null
            state.value.userName=null
            state.value.profileImage=null
        },


    },
});

export const {setUser, setProfileImage , clearUser}= authSlice.actions

export default authSlice.reducer;



