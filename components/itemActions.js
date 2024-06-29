import React, {  useState } from 'react';
import { Pressable, StyleSheet, View, Text, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import CustomToast from './alerts/customToast';

import { useDispatch } from 'react-redux';
import { addProduct } from '../features/cartSlice';

export default function ItemActions({product}) {

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    const dispatch = useDispatch()



    const showToast = (message) => {
        setToastMessage(message);
        setToastVisible(true);
    };

    const handleFavoritePress = () => {
        setIsFavorite(prevState => !prevState);
        showToast(`Se ha ${isFavorite ? 'removido' : 'agregado'} ${product.brand} de favoritos`);
    };

    const handleAddToCartPress =()=>{
        dispatch(addProduct(product))
        showToast(`Se ha agregado ${product.brand} al carrito`)
    }

    return (
        <View style={styles.itemWidget}>
            <View style={styles.secondaryButtons}>
                <Pressable onPress={handleFavoritePress}>
                
                    <FontAwesome5 name="bolt" size={24} color={isFavorite ? "black" : "grey"} />
                </Pressable>
                <Pressable onPress={() => Alert.alert("Compartir")}>

                    <AntDesign name="sharealt" size={24} color="black" />
                </Pressable>
            </View>
            <Pressable
                style={styles.button}
                onPress={ handleAddToCartPress }
            >
                <Text style={styles.buttonText}>Agregar al carrito</Text>
            </Pressable>
            <CustomToast
                visible={toastVisible}
                message={toastMessage}
                onHide={() => setToastVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemWidget: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    secondaryButtons: {
        flexDirection: 'row',
        gap: 32,
    },
});