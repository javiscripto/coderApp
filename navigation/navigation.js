import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "../screens/authStack";
import { TabNavigation } from "./tabNavigation";
import { useSelector } from "react-redux";




export const MainNavigation =()=>{

    //const [user, setUser]= useState(null)
    const user = useSelector(state=>state.auth.value.user)
    return(

    <NavigationContainer>
        {user?<TabNavigation/>:<AuthStack/>}
    </NavigationContainer>

)
}

