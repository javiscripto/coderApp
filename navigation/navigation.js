import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home";
import Welcome from "../screens/welcome";
//importacion de iconos desde expo icons
import { Entypo } from '@expo/vector-icons';
import shopStack from "../screens/shopStack";
import CartStack from "../screens/cartStack";
import ProfileStack from "../screens/profileStack";


const Tab=createBottomTabNavigator();

const Tabs= ()=>{
    return(
            <Tab.Navigator
                screenOptions={
                    
                    ({route})=>({
                        
                    tabBarIcon:({color,focused,size})=>{
                        let iconName;
                        let iconColor = focused ? "#d62828" : "#8e8e93"; 

                        if(route.name==="Home"){
                            iconName="home"
                        }else if(route.name==="Tienda"){
                            iconName="shop"
                        }else if(route.name==="carrito"){
                            iconName="shopping-cart"

                        }else if(route.name==="perfil"){
                            iconName="user"
                        }
                            //encontrar otra manera de renderizar iconos
                        return(<Entypo name={iconName} size={24} color={iconColor} />)
                    },
                    headerShown:false
                    
                })}
            >
                <Tab.Screen name="Home" component={Home}/>

                <Tab.Screen name="Tienda" component={shopStack}/>

                <Tab.Screen name="carrito" component={CartStack}/>

                {/* <Tab.Screen name="Welcome" component={Welcome}/> */}

                <Tab.Screen name="perfil" component={ProfileStack}/>
            </Tab.Navigator>
        
    )
}
export const Navigation =()=>(
    <NavigationContainer>
        <Tabs/>
    </NavigationContainer>
)