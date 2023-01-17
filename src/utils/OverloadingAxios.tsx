import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

const URL = `https://aa01-2a02-4e0-2d0d-a19-c064-5e0e-8d5d-ef8f.eu.ngrok.io/api`;
// `http://127.0.0.1:8000/api`;
// const URL = `https://shark-app-jqn2a.ondigitalocean.app/api`;

async function axiosMethodOverload(url: string, header: any): Promise<string>;

async function axiosMethodOverload(
  url: number,
  header: any,
  data: number,
): Promise<number>;

async function axiosMethodOverload(
  url: number,
  header: any,
  setData: number,
  setUser: any,
): Promise<number>;

async function axiosMethodOverload(
  url: number,
  header: any,
  sendData: any,
  setData: number,
  setUser: any,
): Promise<number>;

async function axiosMethodOverload(
  method: string,
  url: string,
  header: any,
  setData: number,
  setLoading: any,
  setUser: any,
  errorMessages: any,
): Promise<number>;

async function axiosMethodOverload(
  method: any,
  url: string,
  header: any,
  sendData?: any,
  setData?: any,
  setLoading?: any,
  setUser?: any,
  errorMessages?: any,
): Promise<any> {
  return axios({
    method: method,
    url: `${URL}${url}`,
    headers: header,
    data: sendData,
  })
    .then(response => {
      setData(response.data);
      setLoading(true);
    })
    .catch(async error => {
      if ([401, 403].includes(error.response.status)) {
        Alert.alert('Oturum süreniz dolmuştur. Lütfen tekrar giriş yapınız', [
          {
            text: 'Tamam',
          },
        ]);
        await AsyncStorage.removeItem('@user');
        setUser(null);
      } else if (error.response.status === 500) {
        Alert.alert('İşlem sırasında bir hata oluştu', [
          {
            text: 'Tamam',
          },
        ]);
      } else {
        console.error(error);
        errorMessages;
      }
    }).finally(() => {
      setLoading(false);
    });
}

module.exports = axiosMethodOverload;
