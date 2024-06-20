import React from 'react';
import { StyleSheet, Text, FlatList, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { CartItem } from '../components/cartItem';
import { usePostOrderMutation } from '../services/shopService';
import { useDispatch } from 'react-redux';
import { deleteCart } from '../features/cartSlice';

import {Loader} from "../components/loader"

function CartStack() {
  const cart = useSelector(state => state.cart.value.items);
  const total = useSelector(state => state.cart.value.total);
  const user= useSelector(state=>state.cart.value.user);


  // handler enviar orden a la db 
  const [triggerPOST, {isLoading}] = usePostOrderMutation();
  const dispatch=useDispatch()
 


  const handlerConfirmOrderPress = async () => {
    const date = new Date().toLocaleString('es-ES',{timeZone: 'America/Santiago'})

    const response = await triggerPOST({ cart, total, user , createdAt:date});

    if ( response.data) {
      dispatch(deleteCart());
    } else {
      console.error('Error al confirmar la orden');
    }
  }


  //----------------
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>carrito de compras</Text>
      {cart.length === 0 ? (
        <View style={styles.cart}>
          <Text style={styles.text}>Tu carrito está vacío :c</Text>
        </View>
      ) : (
        <View style={styles.cart}>

          {isLoading && (
            <Loader/>
          )}

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
            {cart.length > 0 && (
              <Pressable style={styles.button} onPress={handlerConfirmOrderPress}>
                <Text style={styles.buttonText}>Confirmar la compra</Text>
              </Pressable>
            )}

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
  total: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    alignSelf: "auto",
  },
  buttonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#d62828',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
});
