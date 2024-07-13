import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import ShopStack from "../screens/shopStack";
import CartStack from "../screens/cartStack";
import ProfileStack from "../screens/profileStack";
import { useSelector } from "react-redux";
import { StyleSheet, Image } from "react-native";
import React from 'react';
import {OrderList} from "../screens/orderList";
import { WishList } from "../screens/whishList";


const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
        const profileImage = useSelector(state => state.auth.value.user.photo)


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
                        
                    }else if(route.name==="ordenes"){
                        iconName="list"
                    } else if (route.name === "carrito") {
                        iconName = "shopping-cart";
                    } else if (route.name === "deseos") {
                        return <FontAwesome6 name="bolt" size={24} color={iconColor} />
                    }
                    else if (route.name === "cuenta"){
                        if(profileImage){
                            return(
                                <Image source={{ uri: profileImage }} style={styles.img} />
                            )
                        }
                        iconName = "user";
                            
                        
                    }

                    return <Entypo name={iconName} size={size} color={iconColor} />;
                },
                headerShown: false
            })}
        >
            {/* <Tab.Screen name="Home" component={Home} /> */}
            <Tab.Screen name="Tienda" component={ShopStack} />
            <Tab.Screen name="carrito" component={CartStack} />
            <Tab.Screen name="ordenes" component={OrderList}/>
            <Tab.Screen name="deseos" component={WishList}  />
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
