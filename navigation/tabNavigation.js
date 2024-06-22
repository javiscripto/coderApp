import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from '@expo/vector-icons';
import Home from "../screens/home";
import ShopStack from "../screens/shopStack";
import CartStack from "../screens/cartStack";
import ProfileStack from "../screens/profileStack";




const Tab=createBottomTabNavigator();

export const TabNavigation= ()=>{
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

                        }else if(route.name==="cuenta"){
                            iconName="user"
                        }
                            //encontrar otra manera de renderizar iconos
                        return(<Entypo name={iconName} size={24} color={iconColor} />)
                    },
                    headerShown:false
                    
                })}
            >
                <Tab.Screen name="Home" component={Home}/>

                <Tab.Screen name="Tienda" component={ShopStack}/>

                <Tab.Screen name="carrito" component={CartStack}/>

               <Tab.Screen name="cuenta" component={ProfileStack}/>


                {/* <Tab.Screen name="login" component={AuthStack}/> */}
            </Tab.Navigator>
        
    )
};