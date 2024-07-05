import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "../screens/authStack";
import { TabNavigation } from "./tabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/shopService";
import { setUser, setUserPhoto } from "../features/authSlice";
import { fetchSession } from "../DB"; 

export const MainNavigation = () => {
  const dispatch = useDispatch();

  const { localId, email } = useSelector((state) => state.auth.value.user);
  const { token } = useSelector((state) => state.auth.value);
  const { data: img, isLoading } = useGetProfileImageQuery(localId);

  useEffect(() => {
    if (img) {
      dispatch(setUserPhoto(img.image));
    }
  }, [img]);



  useEffect(()=>{
    const getSession= async ()=>{
      const session= await fetchSession()
      if(session)dispatch(setUser(session))
    }
  getSession()
  },[])

  

  return (
    <NavigationContainer>
      {localId ? <TabNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};
