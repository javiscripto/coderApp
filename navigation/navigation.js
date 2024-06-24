import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "../screens/authStack";
import { TabNavigation } from "./tabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/shopService";
import { setUserPhoto } from "../features/authSlice";




export const MainNavigation =()=>{

    const dispatch = useDispatch();

    
    const {data:dataImage} = useGetProfileImageQuery(localId)
    const localId = useSelector(state=>state.auth.value.user.localId);

    useEffect(()=>{
        if(dataImage){
            dispatch(setUserPhoto(dataImage.image))
        }
    },[dataImage])

    return(

    <NavigationContainer>
        {localId?<TabNavigation/>:<AuthStack/>}
    </NavigationContainer>

)

}
