import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../features/cartSlice';
import { CustomButton } from './customButton';
import CustomToast from './alerts/customToast';
import { useAddWishListItemMutation } from '../services/shopService';
import Loader from './loader';

export default function ItemActions({ product }) {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    const dispatch = useDispatch();
    const { localId } = useSelector(state => state.auth.value.user);

    const [triggerAddItem, { isLoading, isError, data }] = useAddWishListItemMutation();

    const showToast = (message) => {
        setToastMessage(message);
        setToastVisible(true);
    };

    const handleFavoritePress = async () => {
        try {
            
            await triggerAddItem({ localId, product });

            setIsFavorite(prevState => !prevState);
            showToast(`Se ha ${isFavorite ? 'removido' : 'agregado'} ${product.brand} de favoritos`);
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            showToast("Hubo un error al agregar el producto a favoritos");
        }
    };

    const handleAddToCartPress = () => {
        dispatch(addProduct(product));
        showToast(`Se ha agregado ${product.brand} al carrito`);
    };

    return (
        <View style={styles.itemWidget}>
            {isLoading&&(<Loader/>)}
            <View style={styles.secondaryButtons}>
                <Pressable onPress={handleFavoritePress}>
                    <FontAwesome5 name="bolt" size={24} color={isFavorite ? "black" : "grey"} />
                </Pressable>
                <Pressable onPress={() => Alert.alert("Compartir")}>
                    <AntDesign name="sharealt" size={24} color="black" />
                </Pressable>
            </View>

            <CustomButton onPress={handleAddToCartPress}>
                Agregar al carrito
            </CustomButton>

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
    secondaryButtons: {
        flexDirection: 'row',
        gap: 32,
    },
});
