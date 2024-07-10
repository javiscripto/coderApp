import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export const CustomButton = ({children, onPress}) => {


    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#d62828',
        margin:8,
        padding:16,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: '#fff',
    },
})