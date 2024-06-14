import React , {useState} from 'react'
import {  StyleSheet, View , Text, Pressable} from 'react-native'
import { useDispatch } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomToast from './alerts/customToast';
import { deleteProductById } from '../features/cartSlice';


export const CartItem = ({
    img, brand, price, quantity, id
}) => {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const dispatch= useDispatch();

    const handleDeletePress= ( productId)=>{
        const brandOfProduct=brand
        showToast(`se ha eliminado el producto ${brandOfProduct} de tu carrito`)
        dispatch(deleteProductById(productId));
        
    };













































    

  const showToast = (message) => {
        setToastMessage(message);
        setToastVisible(true);
    };
    const totalItem= price*quantity

    return (
        <View style={styles.cartItem}>
            {/* <Image source={{uri:img}} style={styles.img}/> */}
            <Text style={styles.Brandtext}>

                {brand}
            </Text>
            <Text style={styles.text}>
                ${price}
            </Text>
            <Text style={styles.text}>
                {quantity}
            </Text>
            <Text style={styles.text}>
                ${totalItem}
            </Text>


            <Pressable 
            onPress={()=>handleDeletePress(id)}
            style={styles.pressable}>
            <AntDesign name="delete" size={16} color="black" />
            </Pressable>

            <CustomToast
                visible={toastVisible}
                message={toastMessage}
                onHide={() => setToastVisible(false)}
            />
        </View>
    )
};




const styles = StyleSheet.create({
    cartItem: {
        width:"100%",
        flex: 1,
        flexDirection:"row",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        gap:8
    },
    img:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    Brandtext:{
        width:`25%`
    },
    text:{
        width:65,
        fontFamily: "Roboto-Regular",
        fontSize:12,
        textAlign:"center"
    },
    pressable:{
        
        // right:4,
    }
})
