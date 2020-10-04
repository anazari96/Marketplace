import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LatLng} from 'react-native-maps';
import {Button} from 'react-native-paper';
import {MainColor} from '../../constants/colors';

interface IProps {
  id: string;
  title: string;
  type: 'CATEGORY' | 'PRODUCT' | 'ORDER';
  onPress?: (id: string) => void;
  coordinate?: LatLng;
  status?: 'PENDING' | 'INPROGRESS' | 'DELIVERY' | 'DELIVERD';
}

export const Item: React.FC<IProps> = (props) => {
  const {title, type, coordinate, status} = props;

  const onPress = useCallback(() => {
    props.onPress?.(props.id);
  }, [props.id]);

  return (
    <Pressable
      style={styles.container}
      onPress={type === 'CATEGORY' ? onPress : undefined}>
      {type === 'ORDER' ? (
        <>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.title, {flex: 2}]}>
            Coordinates:{' '}
            <Text style={{color: MainColor}}>
              (
              {`${coordinate?.latitude.toFixed(
                2,
              )} , ${coordinate?.longitude.toFixed(2)}`}
              )
            </Text>
          </Text>
          <Text style={[styles.title, {flex: 1.5}]}>
            Status:{' '}
            <Text style={{color: status === 'DELIVERD' ? 'green' : MainColor}}>
              ({`${status}`})
            </Text>
          </Text>
        </>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
      {type === 'PRODUCT' ? (
        <Button
          style={styles.button}
          color={MainColor}
          mode="contained"
          onPress={onPress}>
          Buy
        </Button>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 2,
    paddingHorizontal: 10,
  },
  title: {
    flex: 1,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: '500',
  },
  button: {},
});
