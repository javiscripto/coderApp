import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from '../assets/icons/profile' //svg image

export default function MyProfile() {







  
  return (
    <SafeAreaView style={styles.myProfile}>
      <Profile/>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}> Cambiar foto de perfil     </Text>
      </Pressable>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    myProfile:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        gap:32,
    },
    button: {
        backgroundColor: '#d62828',
        margin: 16,
        padding: 16,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: '#fff',
    },
})