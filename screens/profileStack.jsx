import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from './myProfile';
import ImageSelector from './imageSelector';


const {Navigator:StackNavigator, Screen:StackScreen}=createStackNavigator();


export default function ProfileStack() {
  return (
    <StackNavigator
    screenOptions={{
      
      headerShown:false
    }}
    >

      <StackScreen name='myProfile' component={MyProfile}/>
      <StackScreen name='imageSelector' component={ImageSelector}/>

    </StackNavigator>
  )
}