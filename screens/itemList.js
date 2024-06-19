// ItemList.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import ItemCard from '../components/itemCard';
import SearchInput from '../components/searchInput';
import { setCategorySelected, setProducts } from '../features/shopSlice';
import { useGetProductsQuery } from '../services/shopService';

function ItemList() {
    const { navigate } = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    // Obtener la categoría de los parámetros de la ruta
    const category = route.params.category;

    // Despachar la acción cuando el componente se monta
    useEffect(() => {
        dispatch(setCategorySelected(category));
    }, [category, dispatch]);

    // Obtener los productos desde la API
    const { data: products, error, isLoading } = useGetProductsQuery();

    useEffect(() => {
        if (products) {
            dispatch(setProducts(products));
        }
    }, [products, dispatch]);

    // Obtener los productos filtrados del estado global
    const filteredProducts = useSelector((state) => state.shop.filteredProduct);

    // Estado y función para manejar la búsqueda
    const [productTitle, setProductTitle] = useState("");
    const [searchResults, setSearchResults] = useState(filteredProducts);

    useEffect(() => {
        setSearchResults(filteredProducts);
    }, [filteredProducts]);

    const handlerSearch = (productTitle) => {
        setProductTitle(productTitle);
        const results = filteredProducts.filter(prods =>
            prods.brand.toLowerCase().includes(productTitle.toLowerCase().trim())
        );
        setSearchResults(results);
    };

    // Función para navegar al detalle del producto
    const goToItemDetail = (productId) => {
        navigate("ItemDetail", { productId });
    };

    return (
        <SafeAreaView style={styles.container}>
            <SearchInput
                onChangeText={handlerSearch}
                placeholder="Buscar producto en la categoria..."
                value={productTitle}
            />

            {isLoading && <Text>Cargando productos...</Text>}
            {error && <Text>Error al cargar productos</Text>}

            {searchResults && searchResults.length === 0 ? (
                <Text>
                    No se ha encontrado el producto "{productTitle}"
                </Text>
            ) : null}

            <FlatList
                initialNumToRender={10}
                contentContainerStyle={styles.flatlist}
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ItemCard
                        {...item}
                        onPress={() => goToItemDetail(item.id)}
                    />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        top: 16
    },
    flatlist: {
        gap: 8,
    },
    button: {
        backgroundColor: "#d62828",
        width: 200,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
    },
    textButton: {
        color: "#fff"
    }
});

export default ItemList;
