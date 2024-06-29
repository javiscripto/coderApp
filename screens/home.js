import React from 'react'
import {  StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, } from 'react-redux'
import { Banner } from '../components/banner'
import { FlatListCategory } from '../components/flatListCategory'
import { Offers } from '../components/offers'



export default function Home() {

  const dispatch = useDispatch()



  
  

  return (
    <SafeAreaView style={styles.home} >
      <Banner/>
      
     <FlatListCategory/>

     <Offers/>
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
