import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useGetWishListQuery } from '../services/shopService';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { setWishList } from '../features/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../components/loader';
import { WishListItem } from '../components/wishListItem';



export const WishList = () => {
    const {navigate}= useNavigation()

    const localId = useSelector(state => state.auth.value.user.localId);
    const currentWishList = useSelector(state => state.auth.value.wishlist);

    const { data: wishList, isLoading, refetch } = useGetWishListQuery(localId, { refetchOnFocus: true });

    const dispach = useDispatch();

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );



    useEffect(() => {
        if (wishList) {
            dispach(setWishList(wishList));
        }
    }, [wishList, dispach])



    const goToItemDetail = (productId) => {
        navigate("ItemDetail", { productId });
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <Loader />
            ) : (
                <>

                    <Text style={styles.header}>favoritos</Text>

                    <FlatList
                        data={currentWishList}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.flatList}
                        ListEmptyComponent={
                            <Text style={styles.itemText}>tu lista de favoritos esta vacía</Text>
                        }

                        renderItem={({ item }) => (
                            <WishListItem
                                {...item}
                                onPress={() => goToItemDetail(item.id)}
                            />
                        )}



                    />

                </>
            )}

        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
        textAlign: 'center',
    },
    flatList: {
        padding: 16,
        margin:16,
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
    },
})