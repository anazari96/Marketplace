import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsScreen from '../ProductsScreen';
import Item from '../../components/Item';
import {categories} from '../../data';
import {useNavigation} from '@react-navigation/native';
import MapView from '../../components/MapView';

const Stack = createStackNavigator();

export const CategoriesScreen: React.FC = (props) => {
  const navigation = useNavigation();
  const onSelectCategory = useCallback((id: string) => {
    navigation.navigate('Products', {
      id,
    });
  }, []);

  return (
    <View style={styles.container}>
      {categories.map((v) => (
        <Item
          id={v.id}
          type="CATEGORY"
          title={v.title}
          onPress={onSelectCategory}
          key={v.id}
        />
      ))}
    </View>
  );
};

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="MapView" component={MapView} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
