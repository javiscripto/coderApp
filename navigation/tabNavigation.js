import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from '@expo/vector-icons';
import Home from "../screens/home";
import ShopStack from "../screens/shopStack";
import CartStack from "../screens/cartStack";
import ProfileStack from "../screens/profileStack";
import { useSelector } from "react-redux";
import { StyleSheet, Image } from "react-native";
import React from 'react';


const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
        const {photo} = useSelector(state => state.auth.value.user)



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
                        if(photo){
                            return(
                                <Image source={{ uri: photo }} style={styles.img} />
                            )
                        }
                        iconName = "user";
                            
                        
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
