import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from '@expo/vector-icons';
import Home from "../screens/home";
import ShopStack from "../screens/shopStack";
import CartStack from "../screens/cartStack";
import ProfileStack from "../screens/profileStack";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet } from "react-native";
import React from 'react';
import { useGetProfileImageQuery } from "../services/shopService";
import { setProfileImage } from "../features/authSlice";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
    
    const profileImage = useSelector(state => state.auth.value.profileImage);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    let iconName;
                    let iconColor = focused ? ("#d62828" ):("#8e8e93") ;

                    if (route.name === "Home") {
                        iconName = "home";
                        
                    } else if (route.name === "Tienda") {
                        iconName = "shop";
                        
                    } else if (route.name === "carrito") {
                        iconName = "shopping-cart";
                    } else if (route.name === "cuenta") {
                        if (profileImage) {
                            return <Image source={{ uri: profileImage }} style={styles.img} />;
                        } else {
                            iconName = "user";
                            
                        }
                    }

                    return <Entypo name={iconName} size={size} color={iconColor} />;
                },
                headerShown: false
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Tienda" component={ShopStack} />
            <Tab.Screen name="carrito" component={CartStack} />
            <Tab.Screen name="cuenta" component={ProfileStack} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    img: {
        width: 32,
        height: 32,
        borderRadius: 12,
        resizeMode: "cover",
    }
});
