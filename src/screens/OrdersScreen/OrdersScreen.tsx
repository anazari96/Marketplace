import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Item from '../../components/Item';
import {OrderType} from '../../data';
import {getOrders} from '../../utils/orderFuncs';

const Stack = createStackNavigator();

export const OrdersScreen: React.FC = (props) => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState<OrderType[]>();

  useEffect(() => {
    let interval: any;
    try {
      interval = setInterval(() => {
        getOrders()
          .then((v) => {
            setOrders(v);
          })
          .catch((e) => {
            console.log('err', e);
          });
      }, 5000);
    } catch (error) {
      console.log('err', error);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getOrders()
        .then((v) => {
          setOrders(v);
        })
        .catch((e) => {
          console.log('err', e);
        });
    });
  }, [navigation]);

  return (
    <ScrollView>
      {orders?.map((v) =>
        v ? (
          <Item
            id={v.id}
            type="ORDER"
            title={v.productTitle}
            coordinate={v.coordinate}
            status={v.status}
            onPress={() => {}}
            key={v.id}
          />
        ) : null,
      )}
    </ScrollView>
  );
};

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
