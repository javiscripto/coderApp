
import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export const Offers = () => {
    return (
        <ImageBackground
            source={require(`../assets/img/gesture.jpg`)}
            resizeMode='contain'
            style={styles.img}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}> rockea con nuestras ofertas </Text>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>ver ofertas</Text>
                </Pressable>
            </View>

        </ImageBackground>
    )
};


const styles = StyleSheet.create({
    img: {
        height: 300,
        backgroundColor: "white"
    },
    textContainer: {
        alignItems: 'center',
        borderRadius: 16,
        borderBlockColor: "#fff",
        //backgroundColor:"#000",
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 64,
        width: '100%',
    },
    title: {
        color: "#d62",
        fontFamily: "Bungee-Regular",
        fontSize: 40,
        textAlign: "center",

    },
    button: {
        alignSelf:"flex-end",
        backgroundColor: '#d6282880',
        margin: 16,
        padding: 16,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: 'Bungee-Regular',
        fontSize: 8,
        color: '#fff',
    },
})