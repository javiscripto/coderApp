import React from 'react';
import { Text, StyleSheet, Image, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import data from "../data/data.json";
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ItemActions from '../components/itemActions';

function ItemDetail() {

    const { goBack } = useNavigation()


    const route = useRoute();
    const { productId } = route.params;
    const product = data.find(product => product.id === productId);

    if (!product) {
        return (
            <SafeAreaView style={styles.itemContainer}>
                <Text>oops, algo salio mal</Text>
            </SafeAreaView>
        );
    }

    const { img, brand, description, price } = product;


    return (
        <SafeAreaView style={styles.itemDetail}>


            <Pressable onPress={goBack} style={styles.goback}>
                <AntDesign name="back" size={24} color="black" />
                <Text>volver a la tienda</Text>
            </Pressable>


            <View style={styles.productContainer}  >
                <Image source={{ uri: img }} style={styles.img} />
                <View>
                    <Text style={styles.title}>
                        {brand}
                    </Text>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                    <Text style={styles.price}>
                        $ {price}
                    </Text>
                </View>
                <View style={styles.widget}>
                    <ItemActions product={product} />

                </View>
            </View>

        </SafeAreaView>
    );
}

export default ItemDetail;

const styles = StyleSheet.create({
    itemDetail: {
        flex: 1,
        padding: 16,

    },
    goback: {
        flexDirection: "row",
        gap: 16,
    },
    productContainer: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 16,
        padding: 16,
        objectFit: "cover"
    },

    title: {
        fontWeight: "bold",
        fontSize: 32
    },
    description: {
        fontSize: 16
    },
    img: {
        width: 250,
        height: 250,
        resizeMode: "cover"
    },
    price: {
        fontSize: 16,
        fontFamily: "Roboto-Black"
    },
    description: {
        textAlign: "center"
    },
    widget: {
        alignSelf: "stretch",
    }
});
