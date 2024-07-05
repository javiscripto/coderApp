import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "../screens/authStack";
import { TabNavigation } from "./tabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/shopService";
import { setUserPhoto } from "../features/authSlice";
import { insertSession } from "../DB"; 

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

  useEffect(() => {
    if (localId && email && token) {
      insertSession({ email, localId, token })
        .then(() => {
          console.log("Sesión insertada correctamente");
        })
        .catch((error) => {
          console.error("Error insertando sesión:", error);
        });
    }
  }, [localId, email, token]);



  

  return (
    <NavigationContainer>
      {localId ? <TabNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};
