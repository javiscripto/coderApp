import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector, } from 'react-redux'
import { Banner } from '../components/banner'
import { FlatListCategory } from '../components/flatListCategory'
import { Offers } from '../components/offers'



export default function Home() {

  const username = useSelector(state => state.auth.value.user.userName)





  return (
    <SafeAreaView style={styles.home} >

      
      <Banner>Bienvenido {username} !</Banner>

      <FlatListCategory />

      <Offers />
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  home: {
    alignContent: "center",
    gap: 24,
  },

})
