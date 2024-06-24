import { createSlice } from "@reduxjs/toolkit";


export const authSlice= createSlice({
    name:"auth",
    initialState:{
        value:{
            user:{
                userName:null,
                email:null,
                localId: null,
                photo:null,
            },
            token:null,
            profileImage:null
        }
    },
    reducers:{
        setUser:(state, action)=>{
            state.value.user.email= action.payload.data.email
            state.value.user.localId= action.payload.data.localId
            state.value.token= action.payload.data.idToken
            state.value.userName=action.payload.data.displayName
        },
        setProfileImage:(state, action)=>{
            state.value.profileImage=action.payload
        },
        setUserPhoto:(state, action)=>{
            state.value.user.photo=action.payload
        },
        clearUser:(state)=>{
            state.value.user=null
            state.value.token= null
            //state.value.localId=null
            state.value.userName=null
            state.value.profileImage=null
        },


    },
});

export const {setUser, setProfileImage , setUserPhoto, clearUser}= authSlice.actions

export default authSlice.reducer;



