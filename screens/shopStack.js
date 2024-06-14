import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ItemList from './itemList';
import ItemDetail from './itemDetail';
import Home from './home';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

function ShopStack() {
    return (
        <StackNavigator
        screenOptions={{
            headerShown:false
            
          }}
        >
            <StackScreen name="Home" component={Home}/>
            <StackScreen name='ItemList' component={ItemList} />
            <StackScreen name='ItemDetail' component={ItemDetail} />
        </StackNavigator>
    );
}

export default ShopStack;
