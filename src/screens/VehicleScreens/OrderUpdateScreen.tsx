import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { Image } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomizeButton from '../../components/CustomizeButton';
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from '../../../AuthContext';
import { useOrder } from '../../context/OrderContext';
import CustomizeModal from '../../components/CustomizeModal';
import { ImageHandleHelper } from '../../utils/Helpers';
import { AxiosClient } from '../../client/AxiosClient';
import { OrderUpdateScreenCss } from '../../assets/css/OrderUpdateScreenCss';
import axiosMethodOverload from '../../utils/OverloadingAxios';
import { DrawerContentScrollView } from '@react-navigation/drawer';
const camera = 'https://cdn-icons-png.flaticon.com/512/1414/1414474.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const initialValue: any[] | (() => any[]) = [];

const OrderUpdateScreen = ({ navigation }) => {
  const [image1, setImage1] = useState(camera);
  const [image2, setImage2] = useState(camera);
  const [image3, setImage3] = useState(camera);
  const [image4, setImage4] = useState(camera);
  const [image5, setImage5] = useState(camera);
  const [image6, setImage6] = useState(camera);
  const [verificationCodeInput, setVerificationCodeInput] = useState();
  const [verificationCodeStatus, setVerificationCodeStatus] = useState(false);
  const [orderGeneralInfo, setOrderGeneralInfo] = useState();
  const [isModalVisibleState, setModalVisibleState] = useState();
  const [orderData, setOrderData] = useState();
  const [note, setNote] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(initialValue);
  const [planByOrder, setPlanByOrder] = useState(initialValue);
  const [user, setUser] = useAuth();
  const [orderStatus, setOrderStatus] = useOrder();
  const [mandatoryNote, setMandatoryNote] = useState();
  const [mandatoryImage, setMandatoryImage] = useState();
  const [mandatoryStatus, setMandatoryStatus] = useState();
  let orderId;

  const getOrderId = async () => {
    orderId = await AsyncStorage.getItem('itemOrderId');
    setOrderData(orderId);
    await AxiosClient.post(
      '/api/vehicle/plan/status',
      {
        order_id: orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then(response => response.data)
      .then(async json => {
        let data = [];
        let jsonResult = json.status_list;
        jsonResult.map(async (item: any) => {
          console.warn(item);
          data.push({
            label: item.value,
            value: item.id,
          });
          setItems(data);
          await AsyncStorage.setItem(
            '@orderStatus',
            JSON.stringify(item.status),
          );
          setOrderStatus(item.status);
        });
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };

  const getPlanByOrder = async () => {
    orderId = await AsyncStorage.getItem('itemOrderId');
    await AxiosClient.get(`/api/vehicle/plan/detail/${orderId}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(response => response.data)
      .then(async json => {
        if (json.position !== 1) {
          Alert.alert(
            'Uyarı',
            'İlk siparişiniz bitmeden başka bir siparişe başlayamazsınız.',
            [{ text: 'Tamam', onPress: () => navigation.navigate('Siparişler') }],
          );
        }
        setPlanByOrder(json);
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };

  const getOrder = async () => {
    orderId = await AsyncStorage.getItem('itemOrderId');
    axiosMethodOverload(
      'get',
      `/vehicle/plan/show/${orderId}`,
      { Authorization: `Bearer ${user.accessToken}` },
      null,
      setOrderGeneralInfo,
    );
  };

  const getMandatoryNote = async () => {
    axiosMethodOverload(
      'get',
      '/vehicle/order/allstatus',
      { Authorization: `Bearer ${user.accessToken}` },
      null,
      setMandatoryStatus,
    );
  };

  useFocusEffect(
    useCallback(() => {
      getMandatoryNote();
      getPlanByOrder();
      getOrderId();
      getOrder();
      setMandatoryNote(mandatoryStatus?.note_mandatory_status);
      setMandatoryImage(mandatoryStatus?.image_mandatory_status);
    }, []),
  );


  const orderUpdateHandle = async () => {
    // will add photo mandatory
    try {
      if (value == null) {
        Alert.alert('Uyarı', 'Sipariş durumunu seçiniz', [{ text: 'Tamam' }]);
      } else if (value === 8 && verificationCodeStatus === false) {
        setModalVisibleState(true);
      } else if (mandatoryImage.indexOf(value) && image1 === camera) {
        Alert.alert('Uyarı', 'En az bir fotoğraf ekleyiniz', [{ text: 'Tamam' }])
      } else if (mandatoryNote.indexOf(value) && note === undefined) {
        Alert.alert('Uyarı', 'Not ekleyiniz', [{ text: 'Tamam' }]);
      } else {
        new Promise(async (resolve, reject) => {
          let data = new FormData();
          data.append('order_id', orderData);
          data.append('status', value);
          data.append('note', note);
          image1 === camera
            ? null
            : data.append('file1', {
              uri: image1,
              name: 'order1.jpg',
              type: 'image/jpeg',
            });
          image2 === camera
            ? null
            : data.append('file2', {
              uri: image2,
              name: 'order2.jpg',
              type: 'image/jpeg',
            });
          image3 === camera
            ? null
            : data.append('file3', {
              uri: image3,
              name: 'order3.jpg',
              type: 'image/jpeg',
            });
          image4 === camera
            ? null
            : data.append('file4', {
              uri: image4,
              name: 'order4.jpg',
              type: 'image/jpeg',
            });
          image5 === camera
            ? null
            : data.append('file5', {
              uri: image5,
              name: 'order5.jpg',
              type: 'image/jpeg',
            });
          image6 === camera
            ? null
            : data.append('file6', {
              uri: image6,
              name: 'order6.jpg',
              type: 'image/jpeg',
            });
          resolve(data);
          axiosMethodOverload(
            'post',
            '/vehicle/plan/updateOrderStatus',
            { Authorization: `Bearer ${user.accessToken}`,
              'Content-Type': 'multipart/form-data'
            },
            data,
            null,
            Alert.alert('Bilgi', 'Sipariş durumu güncellendi', [
              { text: 'Tamam',
              onPress: () => navigation.navigate('Siparişler')
            },
            ]),
            image1 === camera ? null : setImage1(camera),
            image2 === camera ? null : setImage2(camera),
            image3 === camera ? null : setImage3(camera),
            image4 === camera ? null : setImage4(camera),
            image5 === camera ? null : setImage5(camera),
            image6 === camera ? null : setImage6(camera),
            setNote(),
          );
        });
      }
    } catch (error) {
      Alert.alert('Uyarı', 'Beklenmeyen bir durum oluştu', [{ text: 'Tamam' }]);
      console.error(error);
    }
  };

  const verificationCodeHandler = async () => {
    if (verificationCodeInput === orderGeneralInfo.sms_verification_code.toString()) {
      Alert.alert('Bilgi', 'Kod doğrulandı. Devam edebilirsiniz', [
        { text: 'Tamam' },
      ]);
      setVerificationCodeStatus(true);
      setVerificationCodeInput('');
      setModalVisibleState(false);
    } else {
      Alert.alert('Uyarı', 'Kod doğrulanamadı', [{ text: 'Tamam' }]);
    }
  };

  return (
    <View style={OrderUpdateScreenCss.container}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        contentInsetAdjustmentBehavior="automatic">
        <View style={OrderUpdateScreenCss.containerOne} />
        <View style={OrderUpdateScreenCss.containerTwo}>
          <>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={OrderUpdateScreenCss.sideBox}>
                <TouchableOpacity onPress={() => ImageHandleHelper(setImage1)}>
                  <Image
                    source={{
                      uri: image1,
                    }}
                    style={[
                      image1 === camera
                        ? OrderUpdateScreenCss.imageForCameraIconPhoto
                        : OrderUpdateScreenCss.imageForRealPhoto,
                    ]}
                    PlaceholderContent={<ActivityIndicator />}
                    height={undefined}
                    width={undefined}
                  />
                </TouchableOpacity>
              </View>
              <View style={OrderUpdateScreenCss.sideBox}>
                <TouchableOpacity onPress={() => ImageHandleHelper(setImage2)}>
                  <Image
                    source={{
                      uri: image2,
                    }}
                    style={[
                      image2 === camera
                        ? OrderUpdateScreenCss.imageForCameraIconPhoto
                        : OrderUpdateScreenCss.imageForRealPhoto,
                    ]}
                    PlaceholderContent={<ActivityIndicator />}
                    height={undefined}
                    width={undefined}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={OrderUpdateScreenCss.sideBox}>
                <TouchableOpacity onPress={() => ImageHandleHelper(setImage3)}>
                  <Image
                    source={{
                      uri: image3,
                    }}
                    style={[
                      image3 === camera
                        ? OrderUpdateScreenCss.imageForCameraIconPhoto
                        : OrderUpdateScreenCss.imageForRealPhoto,
                    ]}
                    PlaceholderContent={<ActivityIndicator />}
                    height={undefined}
                    width={undefined}
                  />
                </TouchableOpacity>
              </View>
              <View style={OrderUpdateScreenCss.sideBox}>
                <TouchableOpacity onPress={() => ImageHandleHelper(setImage4)}>
                  <Image
                    source={{
                      uri: image4,
                    }}
                    style={[
                      image4 === camera
                        ? OrderUpdateScreenCss.imageForCameraIconPhoto
                        : OrderUpdateScreenCss.imageForRealPhoto,
                    ]}
                    PlaceholderContent={<ActivityIndicator />}
                    height={undefined}
                    width={undefined}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={OrderUpdateScreenCss.sideBox}>
                <TouchableOpacity onPress={() => ImageHandleHelper(setImage5)}>
                  <Image
                    source={{
                      uri: image5,
                    }}
                    style={[
                      image5 === camera
                        ? OrderUpdateScreenCss.imageForCameraIconPhoto
                        : OrderUpdateScreenCss.imageForRealPhoto,
                    ]}
                    PlaceholderContent={<ActivityIndicator />}
                    height={undefined}
                    width={undefined}
                  />
                </TouchableOpacity>
              </View>
              <View style={OrderUpdateScreenCss.sideBox}>
                <TouchableOpacity onPress={() => ImageHandleHelper(setImage6)}>
                  <Image
                    source={{
                      uri: image6,
                    }}
                    style={[
                      image6 === camera
                        ? OrderUpdateScreenCss.imageForCameraIconPhoto
                        : OrderUpdateScreenCss.imageForRealPhoto,
                    ]}
                    PlaceholderContent={<ActivityIndicator />}
                    height={undefined}
                    width={undefined}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Not :</Text>
              <TextInput
                style={{
                  width: windowWidth,
                  height: windowWidth / 8,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  paddingLeft: 5,
                }}
                placeholder="Not giriniz"
                value={note}
                onChangeText={text => setNote(text)}
              />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Durum :</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Seçiniz'}
              />
              <CustomizeModal
                inputText={verificationCodeInput}
                onChangeTextInput={setVerificationCodeInput}
                isModalVisible={isModalVisibleState}
                setModalVisible={setModalVisibleState}
                verificationCodeHandler={verificationCodeHandler}
              />
              <CustomizeButton
                insideText={'Güncelle'}
                onPressHandle={orderUpdateHandle}
              />
            </View>
          </>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderUpdateScreen;
