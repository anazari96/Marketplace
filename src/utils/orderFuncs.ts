import AsyncStorage from '@react-native-community/async-storage';

export const addOrder = async (order: any) => {
  try {
    const value = await AsyncStorage.getItem('@orders');
    if (value !== null) {
      const orders = JSON.parse(value);
      orders.push(order);
      const jsonValue = JSON.stringify(orders);
      await AsyncStorage.setItem('@orders', jsonValue);
    } else {
      const jsonValue = JSON.stringify([order]);
      await AsyncStorage.setItem('@orders', jsonValue);
    }
  } catch (e) {
    // error reading value
    console.log('err', e);
  }
};

export const getOrders = async () => {
  try {
    const value = await AsyncStorage.getItem('@orders');
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    // error reading value
    console.log('err', e);
  }
};

export const setOrders = async (orders: any) => {
  try {
    const jsonValue = JSON.stringify(orders);
    await AsyncStorage.setItem('@orders', jsonValue);
  } catch (e) {
    // error reading value
    console.log('err', e);
  }
};
