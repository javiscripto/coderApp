import React, { useState } from 'react';
import { Pressable, StyleSheet , Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../features/counterSlice';

function Counter() {
    const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
    
  return (
    <SafeAreaView style={styles.counter}>
        <Pressable style={styles.buttons} onPress={()=>dispatch(increment())}>
            <Text>+</Text>
        </Pressable>
        <Text>{count}</Text>
        <Pressable style={styles.buttons} onPress={()=>{
            
            if(count!==0){
                dispatch(decrement())
            }
            }}>
            <Text>-</Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default Counter

//styles
const styles= StyleSheet.create({
    counter:{
        backgroundColor:"#f0f0",
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    buttons:{
        width:100,
        justifyContent:"center",
        backgroundColor:"green",
        textAlign:"center"
    }
})