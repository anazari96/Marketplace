import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CategoriesScreen from './screens/CategoriesScreen/CategoriesScreen';
import OrdersScreen from './screens/OrdersScreen/OrdersScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MainColor, SecondaryColor} from './constants/colors';
import {
  addOrder,
  getOrders,
  setOrders as setOrdersFunc,
} from './utils/orderFuncs';
import {useEffect} from 'react';
import {OrderType} from './data';

const Tab = createBottomTabNavigator();

const changeStatus = (order: OrderType): OrderType => {
  switch (order.status) {
    case 'PENDING':
      return {...order, status: 'INPROGRESS'};
    case 'INPROGRESS':
      return {...order, status: 'DELIVERY'};
    case 'DELIVERY':
      return {...order, status: 'DELIVERD'};
    case 'DELIVERD':
      return order;
    default:
      return {...order, status: 'PENDING'};
  }
};

export default function App() {
  const [orders, setOrders] = React.useState<OrderType[]>();

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
      }, 30000);
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
    if (orders?.length && orders?.length > 0) {
      setOrdersFunc(orders?.map((v) => changeStatus(v)));
    }
  }, [orders]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            switch (route.name) {
              case 'Categories':
                return (
                  <Icon
                    name="list"
                    size={20}
                    color={focused ? MainColor : SecondaryColor}
                  />
                );
              case 'Orders':
                return (
                  <Icon
                    name="luggage-cart"
                    size={20}
                    color={focused ? MainColor : SecondaryColor}
                  />
                );
              default:
                return null;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: MainColor,
          inactiveTintColor: SecondaryColor,
          labelStyle: {
            fontWeight: 'normal',
            lineHeight: 20,
          },
          style: {
            height: 48,
          },
          tabStyle: {padding: 2},
        }}>
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
