import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Item from '../../components/Item';
import {categories} from '../../data';

export const ProductsScreen: React.FC<any> = (props) => {
  const navigation = useNavigation();

  const products = useMemo(
    () => categories.find((v) => v.id === props.route.params.id)?.products,
    [props?.route?.params?.id],
  );

  const onBuy = useCallback((id: string) => {
    const product = products?.find((v) => v.id === id);
    if (product) {
      navigation.navigate('MapView', {product});
    }
  }, []);

  return (
    <View style={styles.container}>
      {products?.map((v) => (
        <Item
          id={v.id}
          type="PRODUCT"
          title={v.title}
          onPress={onBuy}
          key={v.id}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
