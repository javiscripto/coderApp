import React from 'react';
import { FlatList, TouchableOpacity, Text , StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation  } from '@react-navigation/native';
import { setCategorySelected } from '../features/shopSlice';


export const FlatListCategory = () => {

    const { navigate } = useNavigation()

    const categories = useSelector((state) => state.shop.categories)
    const dispatch = useDispatch()
  
    const handleCategoryPress = (category) => {
        dispatch(setCategorySelected(category))
        navigate("ItemList", { category })
    };


    return (
        <FlatList
            data={categories}
            horizontal
            contentContainerStyle={styles.flatlist}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.category} onPress={() => handleCategoryPress(item)}>
                    <Text style={styles.categoryTitle}>{item}</Text>
                </TouchableOpacity>
            )}
        />
    )
};


const styles = StyleSheet.create({
    home: {
        alignContent: "center",
        gap: 40
    },
    flatlist: {
        flexDirection: "row",
        gap: 16,
        justifyContent: "space-evenly"

    },
    categoryTitle: {
        fontFamily: "Roboto-Bold",
        textAlign: "center",
        fontSize:8,
    },
    category: {
        //backgroundColor: "orange",
        width: 80,
        height:40,
        justifyContent: "center",
        padding: 8,
        borderRadius: 25

    }
})
