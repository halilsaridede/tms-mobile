import React, { useCallback, useState } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthProvider, { useAuth } from './AuthContext';
import OrderProvider, { useOrder } from './src/context/OrderContext';
// screens
import LoginScreen from './src/screens/AuthScreens/LoginScreen';
import HomeScreen from './src/screens/VehicleScreens/AllOrder';
import OrderUpdateScreen from './src/screens/VehicleScreens/OrderUpdateScreen';
import HelpScreen from './src/screens/VehicleScreens/HelpScreen';
import ServiceInformationScreen from './src/screens/VehicleScreens/ServiceInformationScreen';
import SplashScreen from './src/screens/SplashScreens/SplashScreen';
import { Alert, Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import { AxiosClient } from './src/client/AxiosClient';
import {
  getOneTimeLocation,
  requestLocationPermission,
  subscribeLocationLocation,
} from './src/utils/FunctionForLocation';
import Geolocation from '@react-native-community/geolocation';

// DealerScreens
import NewPreOrderScreen from './src/screens/DealerScreens/NewPreOrderScreen';
import AllPreOrder from './src/screens/DealerScreens/AllPreOrder';
import PreOrderDetailScreen from './src/screens/DealerScreens/PreOrderDetailScreen';
import AllOrder from './src/screens/DealerScreens/AllOrder';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import BackgroundService from 'react-native-background-actions';
import BackgroundJob from 'react-native-background-actions';

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

BackgroundJob.on('expiration', async () => {
  console.log('BackgroundJob started');
});


const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask desc',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'exampleScheme://chat/jane',
  parameters: {
    delay: 4000,
  },
};

function handleOpenURL(evt: any) {
  console.log(evt.url);
  // do something with the url
}

Linking.addEventListener('url', handleOpenURL);

const Navigator = ({ navigation }) => {
  const [data, setData] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [user, setUser] = useAuth();
  const [order, setOrder] = useOrder();
  const [orderStatus, setOrderStatus] = useOrder();
  const [timePassed, setTimePassed] = useState(false);
  let watchID: number;
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

  setTimeout(function () {
    setTimePassed(true);
  }, 4000);


  const postLocation = async () => {
    console.log(currentLatitude, currentLongitude);
    await AxiosClient.post(
      `/api/vehicle/location/${user.vehicle_id}`,    
      {
        lat: currentLatitude,
        lng: currentLongitude,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/json',
        },
      },
      )
      .then(async response => {
        console.log('Location posted');
      })
      .catch(function (error) {
        console.error(error.message);
      });

  };

  const taskRandom = async (taskData: any) => {
    if (Platform.OS === 'ios') {
      console.warn('ios');
    }
    await new Promise(async (resolve, reject) => {
      // For loop with a delay
      const { delay } = taskData;
      console.log(BackgroundJob.isRunning(), delay)
      if (BackgroundJob.isRunning()) {
        postLocation();
        await BackgroundJob.updateNotification({ taskDesc: 'Runned -> ' });
        await sleep(delay);
      }
    });
  };

  let playing = BackgroundJob.isRunning();

  const toggleBackground = async () => {
    playing = !playing;
    if (true) {
      try {
        console.log('Trying to start background service');
        await BackgroundJob.start(taskRandom, options);
        console.log('Successful start!');
      } catch (e) {
        console.log('Error', e);
      }
    } else {
      console.log('Stop background service');
      await BackgroundJob.stop();
    }
  };

  toggleBackground();

  const CustomDrawer = props => {
    const { navigation } = props;
    const logoutHandle = async () => {
      try {
        await AxiosClient
          .post(`/api/logout`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              'Content-Type': 'application/json',
            },
          })
          .then(async response => {
            console.log(response);
          })
          .catch(function (error) {
            console.error(error.message);
          });
        await AsyncStorage.removeItem('@user');
        setUser(null);
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View
          style={{
            padding: 50,
            marginLeft: -30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={logoutHandle}>
            <Text style={{
              fontWeight: 'bold',
            }}>Çıkış Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Yardım')}>
            <Text style={{
              fontWeight: 'bold',
            }}>Yardım</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      const orderValue = await AsyncStorage.getItem('@orderD');
      const orderStatusValue = await AsyncStorage.getItem('@orderStatus');
      if (value !== null) {
        setData(true);
        setLoading(true);
        setUser(JSON.parse(value));
        setOrderStatus(JSON.parse(orderStatusValue));
        setOrder(JSON.parse(orderValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
      const getOneTimeLocationHandler = getOneTimeLocation({
        setLocationStatus,
        setCurrentLongitude,
        setCurrentLatitude,
      });
      requestLocationPermission({
        getOneTimeLocationHandler,
        setLocationStatus,
      });
      Geolocation.getCurrentPosition(
        info => {
          setLocationStatus('You are Here');
          let currentLongitude = JSON.stringify(info.coords.longitude);
          let currentLatitude = JSON.stringify(info.coords.latitude);
          console.log(currentLongitude, currentLatitude);
          setCurrentLongitude(currentLongitude);
          setCurrentLatitude(currentLatitude);
        },
        error => {
          setLocationStatus(error.message);
        },
        {
          timeout: 3000,
          maximumAge: 1000,
        },
      );

      Geolocation.watchPosition(
        position => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          const currentLatitude = JSON.stringify(position.coords.latitude);
          console.warn('WAT H ' + currentLatitude, currentLongitude);
          setCurrentLongitude(currentLongitude);
          setCurrentLatitude(currentLatitude);
        },
        // will look 
        error => Alert.alert('Hata', 'Konumunuz alınamadı.Lütfen konumunuzu açın ve tekrar deneyin.', [{ text: 'Konumu Aç', onPress: () => Linking.openSettings(), },]),
        {
          distanceFilter: 0,
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );

      // watchID !== null && setSubscriptionId(watchID);

      return () => {
        console.log('REMOVE WATCH LOCATION');
        subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
        setSubscriptionId(null);
      };
    }, [currentLatitude, currentLongitude, watchID]),
  );

  if (!timePassed) {
    return <SplashScreen />;
  } else if (user) {
    if (user.role === 'Dealer') {
      return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
          <Stack.Screen name="Yeni Ön Sipariş Ekle" component={NewPreOrderScreen} />
          <Stack.Screen name="Tüm Ön Siparişler" component={AllPreOrder} />
          <Stack.Screen name="Tüm Siparişler" component={AllOrder} />
          <Stack.Screen
            name="Ön Siparişi Güncelle"
            component={PreOrderDetailScreen}
            screenOptions={{
              drawerActiveBackgroundColor: 'red',
              backgroundColor: 'tomato',
            }}
            options={{
              drawerLabel: () => null,
              headerBackground: () => null,
            }}
          />
          <Stack.Screen name="Yardım" component={HelpScreen}
            options={{
              drawerLabel: () => null,
              headerBackground: () => null,
            }}
          />
        </Drawer.Navigator>
      );
    } else if (user.role === 'Driver') {
      return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
          <Stack.Screen name="Siparişler" component={HomeScreen} />
          <Stack.Screen
            name="Servis Bilgisi"
            component={ServiceInformationScreen}
          />
          <Stack.Screen name="Yardım" component={HelpScreen}
            options={{
              drawerLabel: () => null,
              headerBackground: () => null,
            }}
          />
          <Stack.Screen
            name="Sipariş Durumu Güncelle"
            component={OrderUpdateScreen}
            options={{
              drawerLabel: () => null,
              title: null,
              drawerIcon: () => null,
            }}
          />
        </Drawer.Navigator>
      );
    }
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
        <Stack.Screen name="Siparişler" component={HomeScreen} />
        <Stack.Screen
          name="Servis Bilgisi"
          component={ServiceInformationScreen}
        />
        <Stack.Screen
          name="Sipariş Durumu Güncelle"
          component={OrderUpdateScreen}
          options={{
            drawerLabel: () => null,
            title: null,
            drawerIcon: () => null,
          }}
        />
      </Drawer.Navigator>
    );
  } else if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Giriş Ekranı"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      </Stack.Navigator>
    );
  }
};

const App = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const sleep = (time: any) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

  return (
    <NavigationContainer>
      <AuthProvider>
        <OrderProvider>
          <Navigator />
        </OrderProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
