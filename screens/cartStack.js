import React from 'react';
import { StyleSheet, Text, FlatList, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { CartItem } from '../components/cartItem';
import { usePostOrderMutation } from '../services/shopService';
import { useDispatch } from 'react-redux';
import { deleteCart, } from '../features/cartSlice';
import { setOrders } from "../features/authSlice";

import { Loader } from "../components/loader"
import { CustomButton } from '../components/customButton';

function CartStack() {
  const cart = useSelector(state => state.cart.value.items);
  const total = useSelector(state => state.cart.value.total);
  const user = useSelector(state => state.auth.value.user.localId);// localId 


  // handler enviar orden a la db 
  const [triggerPOST, { isLoading }] = usePostOrderMutation();
  const dispatch = useDispatch()



  const handlerConfirmOrderPress = async () => {
    const date = new Date().toLocaleString('es-ES', { timeZone: 'America/Santiago' })

    const response = await triggerPOST({ cart, total, user, createdAt: date });

    if (response.data) {
      dispatch(deleteCart());
      dispatch(setOrders(response.data))
    } else {
      console.error('Error al confirmar la orden');
    }
  }


  //----------------
  return (
    <SafeAreaView style={styles.container}>
        {isLoading?(<Loader/>)
        :(<View style={styles.cart}>

          <Text style={styles.title}>carrito de compras</Text>
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={cart}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CartItem {...item} />}
            ListEmptyComponent={<View >
          <Text >Tu carrito está vacío :c</Text>
        </View>}
          />

          <View style={styles.total}>
            <Text style={styles.text}>
              Total:
            </Text>
            <Text >
              ${total}
            </Text>
            {cart.length > 0 && (
              <CustomButton onPress={handlerConfirmOrderPress}>
                confirmar compra
              </CustomButton>
            )}

          </View>

        </View>
)}
      
    </SafeAreaView>
  )
}

export default CartStack;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
},
  cart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    gap: 16
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontWeight:"bold",
    fontSize: 24,
    textAlign: "center"

  },
  text: {
    fontFamily:"Roboto-Bold"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 80,
    alignSelf: 'stretch'
  },
  flatlist: {
    gap: 16,
    margin:16,
    padding:16,
  },
  total: {
    flexDirection: "row",
    gap: 16,
    margin:16,
    alignItems: "center",
    alignSelf: "auto",
  },

});
