import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';


export default function SearchInput(props) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={styles.searchBar}  >

      <AntDesign name="search1" size={16}
        color={isFocused ? "red" : "black"} />

      <TextInput {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  searchBar: {
    width: "80%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "grey",
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 32,
  }
})