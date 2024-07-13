import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDeleteWishListItemMutation } from '../services/shopService';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWishlistItem } from '../features/authSlice';


export const WishListItem = ({ id, img, brand, price, onPress }) => {

    const dispatch = useDispatch();

    const localId = useSelector(state=>state.auth.value.user.localId);
    const [triggerDelete , {isLoading}] = useDeleteWishListItemMutation()

    const handleDeletePress= async()=>{
        try {
            const response = await triggerDelete({ localId, productId:id})
            dispatch(deleteWishlistItem(id))
        } catch (error) {
            console.error("error al quitar el producto : ", error)
        }
    }


    return (
        <Pressable style={styles.itemContainer} onPress={onPress} >
            <Image source={{ uri: img }} style={styles.img} />


            <View style={styles.textContainer}>
                <Text style={styles.Brandtext} >{brand}</Text>
                <Text>${price}</Text>
            </View>

            <Pressable style={styles.delete} onPress={handleDeletePress}>
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