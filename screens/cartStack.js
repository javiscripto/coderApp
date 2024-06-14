import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { CartItem } from '../components/cartItem';

function CartStack() {
  const cart = useSelector(state => state.cart.value.items);
  const total = useSelector(state => state.cart.value.total);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>carrito de compras</Text>
      {cart.length === 0 ? (
        <View style={styles.cart}>
          <Text style={styles.text}>Tu carrito está vacío :c</Text>
        </View>
      ) : (
        <View style={styles.cart}>
          {/* <View style={styles.header}>
            <Text>Producto</Text>
            <Text>Precio</Text>
            <Text>Cantidad</Text>
            <Text>total</Text>
          </View> */}
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={cart}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CartItem {...item} />}
          />


          <View style={styles.total}>
            <Text>
              Total:
            </Text>
            <Text >
              ${total}
            </Text>
          </View>



        </View>

      )}
    </SafeAreaView>
  );
}

export default CartStack;

const styles = StyleSheet.create({
  cart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    gap: 16
  },
  title: {
    fontFamily: 'Roboto-Black',
    fontSize: 32,
    textAlign: "center"

  },
  text: {

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 80,
    alignSelf: 'stretch'
  },
  flatlist: {
    gap: 16,
  },
  total:{
    flexDirection:"row",
    gap:16,
    alignSelf:"stretch",
  },
});
