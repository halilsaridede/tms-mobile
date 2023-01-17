import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const requestLocationPermission = async ({
  getOneTimeLocation,
  subscribeLocationLocation,
  setLocationStatus,
}) => {
  if (Platform.OS === 'ios') {
    getOneTimeLocation();
    subscribeLocationLocation();
  } else {
    try {
      const backgroundgranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Konum Erişim İzni',
          message:
            'Uygulama arka planda çalışırken konumunuzu kullanmak istiyoruz',
          buttonNeutral: 'Daha sonra sor',
          buttonNegative: 'İptal',
          buttonPositive: 'Tamam',
        },
      );

      if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        setLocationStatus('Konum izni verilmedi');
      }
    } catch (error) {
      console.error('ERRRRR ' + error);
      /*
      setInterval(() => {
        Alert.alert('Uyarı', 'Konum kapalı, lütfen konumunuzu açınız.', [{text: 'Tamam'}]);
      }, 3000);
      */
    }
  }
};

export const getOneTimeLocation = ({
  setLocationStatus,
  setCurrentLongitude,
  setCurrentLatitude,
}) => {
  setLocationStatus('Getting Location ...');
  Geolocation.getCurrentPosition(
    info => {
      setLocationStatus('You are Here');
      let currentLongitude = JSON.stringify(info.coords.longitude);
      let currentLatitude = JSON.stringify(info.coords.latitude);
      setCurrentLongitude(currentLongitude);
      setCurrentLatitude(currentLatitude);
    },
    error => {
      setLocationStatus(error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 1000,
    },
  );
};

export const subscribeLocationLocation = ({
  setLocationStatus,
  setCurrentLongitude,
  setCurrentLatitude,
}) => {
  watchID = Geolocation.watchPosition(
    info => {
      setLocationStatus('You are Here');
      let currentLongitude = JSON.stringify(info.coords.longitude);
      let currentLatitude = JSON.stringify(info.coords.latitude);
      setCurrentLongitude(currentLongitude);
      setCurrentLatitude(currentLatitude);
    },
    error => {
      setLocationStatus(error.message);
    },
    {
      enableHighAccuracy: false,
      maximumAge: 1000,
    },
  );
};
