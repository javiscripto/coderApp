// OrderList.js
import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrdersQuery } from '../services/shopService';
import { setOrders } from '../features/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../components/loader';
import { useFocusEffect } from '@react-navigation/native';

export const OrderList = () => {
  const localId = useSelector(state => state.auth.value.user.localId);
  const currentOrders = useSelector(state => state.auth.value.orders);
  const { data: orders, isLoading, refetch } = useGetOrdersQuery(localId, { refetchOnFocus: true });

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    if (orders) {
      dispatch(setOrders(orders));
    }
  }, [orders, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.header}>Órdenes</Text>
          <FlatList
            data={currentOrders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>id orden: {item.id}</Text>
                {item.createdAt && <Text>Creado en: {item.createdAt}</Text>}
                {item.total && <Text>Total: {item.total}</Text>}
                {item.user && <Text>Usuario: {item.user}</Text>}
              </View>
            )}
            contentContainerStyle={styles.flatList}
            ListEmptyComponent={
                <Text style={styles.itemText}>sin ordenes pendientes</Text>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  flatList: {
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
  },
});

export default OrderList;
