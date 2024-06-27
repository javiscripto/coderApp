import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "../screens/authStack";
import { TabNavigation } from "./tabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/shopService";
import { setUserPhoto } from "../features/authSlice";




export const MainNavigation =()=>{

    const dispatch = useDispatch();

    
    const localId = useSelector(state=>state.auth.value.user.localId);
    const {data:img, isLoading} = useGetProfileImageQuery(localId)

    
    useEffect(()=>{
        
        if(img){

            dispatch(setUserPhoto(img.image))
        }
    },[img])

    return(

    <NavigationContainer>
        {localId?<TabNavigation/>:<AuthStack/>}
    </NavigationContainer>

)

}
