import React from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';

export default function ItemCard({ img, brand, price, onPress }) {
    return (
        <Pressable style={styles.itemCard} onPress={onPress}>
            <Image source={{ uri: img }} style={styles.img} />
            <View>
                <Text style={styles.title}>
                    {brand}
                </Text>
                <Text style={styles.price}>
                    ${price}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    itemCard: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        margin: 16,
        padding: 16,
    },
    title: {
        fontWeight: "bold",
        fontSize: 32
    },
    img: {
        width: 200,
        height: 200,
        resizeMode: "cover"
    },
    price: {
        fontSize: 16,
    }
});
