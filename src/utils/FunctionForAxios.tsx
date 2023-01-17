import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosClient } from '../client/AxiosClient';

export const loginHandler = async ({ email, password, setIsLoading, setUser, userType }) => {
  setIsLoading(true);
  await AxiosClient.post('/api/login', {
    email,
    // email: 'driver1@yandex.com',
    password,
  })
    .then(async function (response) {
      console.warn(response.data);
      if (response.data.role !== userType) {
        Alert.alert('Uyarı', 'Kullanıcı türü yanlış', [{ text: 'Tamam' }]);
      } else if (response.data.role === 'Driver' && response.data.vehicle_id === null) {
        Alert.alert('Uyarı', 'Hesap ayarlarınızda sorun gözüküyor. Lütfen yetkili ile görüşünüz', [{ text: 'Tamam' }]);
      } else if (response.data.role === 'Dealer' && response.data.tms_id === null) {
        Alert.alert('Uyarı', 'Hesap ayarlarınızda sorun gözüküyor. Lütfen yetkili ile görüşünüz', [{ text: 'Tamam' }]);
      } else {
          const responseData = response.data;
          try {
            setUser(responseData);
            await AsyncStorage.setItem('@user', JSON.stringify(responseData));
          } catch (e) {
            console.error(e);
        }
      }
    })
    .catch(function (error) {
      Alert.alert('Uyarı', 'Kullanıcı adı veya şifre yanlış', [
        { text: 'Tamam' },
      ]);
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
