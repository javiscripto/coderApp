import React from 'react'
import { Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Banner } from '../components/banner'
import { useNavigation } from '@react-navigation/native';
import { setCategorySelected } from '../features/shopSlice'
import { FlatListCategory } from '../components/flatListCategory'

export default function Home() {

  const {navigate}=useNavigation()

  const categories = useSelector((state) => state.shop.categories)
  const dispatch = useDispatch()

  const handleCategoryPress = (category) => {
    dispatch(setCategorySelected(category))
    navigate("ItemList",{category})
  }

  return (
    <SafeAreaView style={styles.home} >
      <Banner/>
     <FlatListCategory/>
    </SafeAreaView>
  )
};


const styles= StyleSheet.create({
  home:{
    alignContent:"center",
    gap:40
  },
  flatlist:{
    flexDirection:"row",
    gap:16,
    justifyContent:"space-evenly"

  },
  categoryTitle:{
    fontFamily:"Roboto-Bold",
     textAlign:"center"
  },
  category:{
    backgroundColor:"orange",
    width:150,
    justifyContent:"center",
    padding:8,
    borderRadius:8
   
  }
})
