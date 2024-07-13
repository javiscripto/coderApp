import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';


export const WishListItem = ({ img, brand, price, onPress }) => {
    return (
        <Pressable style={styles.itemContainer} onPress={onPress} >
            <Image source={{ uri: img }} style={styles.img} />


            <View style={styles.textContainer}>
                <Text style={styles.Brandtext} >{brand}</Text>
                <Text>${price}</Text>
            </View>

            <Pressable style={styles.delete} onPress={() => Alert.alert("eliminar")}>
                <AntDesign name="delete" size={16} color="black" />
            </Pressable>


        </Pressable>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems:"center",
        padding: 16,
        gap: 16,
        width:"100%"
    },
    img: {
        width: 40,
        height: 40,
        resizeMode: "cover",
    },
    Brandtext:{
        fontFamily:"Roboto-Black"
    },
    textContainer:{
        width:"39%",
        gap:8,
    },

})