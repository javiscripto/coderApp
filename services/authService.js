import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_key, authUrl } from "../firebase/database";

export const authAPI= createApi({
    reducerPath:`authAPI`,
    baseQuery: fetchBaseQuery({baseUrl: authUrl}),
    endpoints:(builder)=>({
        signUp: builder.mutation({
            query:({...auth}) =>({
                url:`v1/accounts:signUp?key=${API_key}`,
                method:"POST",
                body:auth,
                headers:{
                    'Content-Type':'application/json'
                },
            })
        }),

        login: builder.mutation({
            query:({... auth}) => ({
                url:`v1/accounts:signInWithPassword?key=${API_key}`,
                method:'POST',
                body:auth,
                headers:{
                    'Content-Type':'application/json'
                },
                
            }),
        }),


        //otras acciones
    })
});



export const { useSignUpMutation, useLoginMutation } = authAPI
