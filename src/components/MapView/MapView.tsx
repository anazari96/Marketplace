import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapComponent, {
  LatLng,
  MapEvent,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Button, Snackbar} from 'react-native-paper';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import {orders} from '../../data';
import {StackActions, useNavigation} from '@react-navigation/native';
import {addOrder} from '../../utils/orderFuncs';

interface IProps {
  onSubmit: (pos: any) => void;
}

export const MapView: React.FC<IProps & any> = (props) => {
  const navigation = useNavigation();
  const [currentPos, setCurrentPos] = useState<Region | undefined>();
  const [selectedPos, setSelectedPos] = useState<LatLng | undefined>();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ])
      .then((v) => {
        let requests: any[] = [];
        if (v['android.permission.ACCESS_COARSE_LOCATION'] === 'denied') {
          requests.push(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
        }
        if (v['android.permission.ACCESS_FINE_LOCATION'] === 'denied') {
          requests.push(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        if (requests.length > 0) {
          requestMultiple([
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          ])
            .then((statuses) => {
              console.log(
                'ACCESS_FINE_LOCATION',
                statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
              );
              console.log(
                'ACCESS_COARSE_LOCATION',
                statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION],
              );
            })
            .catch((err) => {
              console.log('err request', err);
            });
        }
      })
      .catch((err) => {
        console.log('err check', err);
      });
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentPos({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.0321,
        });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
      },
    );
  }, []);

  const onSelect = useCallback((e: MapEvent) => {
    setSelectedPos(e.nativeEvent.coordinate);
  }, []);

  const onSubmit = useCallback(() => {
    if (selectedPos) {
      addOrder({
        id: `${Math.random() * 1000}`,
        productId: props.route.params.product.id,
        productTitle: props.route.params.product.title,
        coordinate: selectedPos,
        status: 'PENDING',
      })
        .then(() => {
          navigation.navigate('Orders');
          navigation.dispatch(StackActions.popToTop());
        })
        .catch((e) => {
          console.log('err', e);
        });
    } else {
      setVisible(true);
    }
  }, [selectedPos]);

  return (
    <View style={styles.container}>
      <MapComponent
        region={currentPos}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onLongPress={onSelect}
        provider={PROVIDER_GOOGLE}
        style={styles.map}>
        {selectedPos ? (
          <Marker
            coordinate={{
              ...selectedPos,
            }}
          />
        ) : null}
      </MapComponent>
      <Button
        style={styles.button}
        color="green"
        mode="contained"
        onPress={onSubmit}>
        Submit
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => {
            setVisible(false);
          },
        }}>
        Please select a location on the map!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // flex: 1,
    width: '100%',
    // height: '100%',
  },
  button: {
    width: '80%',
    marginVertical: 10,
  },
});
