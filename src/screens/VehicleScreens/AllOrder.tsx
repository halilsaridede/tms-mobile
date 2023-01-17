import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Logo from '../../assets/images/truck.png';

import DraggableFlatList from 'react-native-draggable-flatlist';
import { useAuth } from '../../../AuthContext';
import { AxiosClient } from '../../client/AxiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreenCss } from '../../assets/css/HomeScreenCss';
import { formatDate } from '../../utils/Helpers';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import axiosMethodOverload from '../../utils/OverloadingAxios';

import { OrderType, OrderStatus } from '../../assets/constant/index';
import { Icon } from 'react-native-elements';

const initialData: any[] | (() => any[]) = [];

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

type Props = {
  onChangeText: () => void;
  onPress: () => void;
  text?: string;
};

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [user, setUser] = useAuth();

  useFocusEffect(
    useCallback(() => {
      axiosMethodOverload(
        'get',
        `/vehicle/plan/${user.vehicle_id}`,
        { Authorization: `Bearer ${user.accessToken}` },
        null,
        setData,
        setIsLoading(true),
        setUser,
      );
    }, []),
  );

  const backgroundColorStyle = (item: any) => {
    if (item === 1) {
      return null;
    } else {
      return { backgroundColor: '#fae6e3' };
    }
  };

  const callHandle = (phone: any) => {
    Linking.openURL(phone).catch(err => console.error('An error occurred', err));
  };

  const renderItem = ({ item, index, drag, isActive }) => (

    item.order?.status !== 13 && item.order?.status !== 11 ?

      <View style={[HomeScreenCss.item, backgroundColorStyle(item.order?.order_type)]}>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={
            item.order?.status !== 9 &&
              item.order?.status !== 10 &&
              item.order?.status === 1
              ? drag
              : null
          }>
          <View style={HomeScreenCss.orderIdPrintPlace}>
            <Text style={HomeScreenCss.orderIdPrintPlaceText}>
              Sipariş#{item.order?.order_number}
            </Text>
            <Text style={{ color: 'black' }}>{item.order?.orderer_name}</Text>
          </View>
          <View style={HomeScreenCss.orderDetailsPlace}>
            <Text>Sipariş Tipi : {OrderType[item.order?.order_type]}</Text>
            <Text>{item.order?.address_description}</Text>
            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
            }} onPress={() => callHandle(item.order?.orderer_phone)}><Text>{item.order?.orderer_phone}
                <Icon name="phone" size={15} color='green' tvParallaxProperties={undefined} />
              </Text></TouchableOpacity>
            <Text>{item.order?.orderer_email}</Text>
            <Text>{OrderStatus[item.order?.status]}</Text>
          </View>
          <View style={HomeScreenCss.orderDetailsOrderDateAndButtonsPlace}>
            <Text style={{ color: 'gray' }}>
              Sipariş Tarihi {formatDate(item.created_at)}
            </Text>
            {item.order?.status === 9 ||
              item.order?.status === 11 ? (
              <>
                <Text>Sipariş Başlama Zamanı</Text>
                <Text>{item.order.start_time}</Text>
                <Text>Sipariş Bitirme Zamanı</Text>
                <Text>{item.order.end_time}</Text>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={HomeScreenCss.updateButton}
                  onPress={() => {
                    if (item.position !== 1 && item.order?.end_time !== null) {
                      Alert.alert(
                        'Uyarı',
                        'Mevcut siparişiniz bitmeden başka bir siparişe başlayamazsınız.',
                        [{ text: 'Tamam' }],
                      );
                    } else {
                      let itemOrderId = item.order_id;
                      const itemOrderIdValue = JSON.stringify(itemOrderId);
                      AsyncStorage.setItem('itemOrderId', itemOrderIdValue);
                      navigation.navigate('Sipariş Durumu Güncelle', {
                        itemOrderId,
                      });
                    }
                  }}>
                  <Text style={HomeScreenCss.buttonsText}>Siparişi Güncelle</Text>
                </TouchableOpacity>
                <View style={{ height: 5 }} />
                <TouchableOpacity
                  style={HomeScreenCss.deleteButton}
                  onPress={() => {
                    Alert.alert(
                      'Sipariş Silinsin mi ?',
                      'Sipariş listeden silinecek',
                      [
                        {
                          text: 'İptal',
                          style: 'cancel',
                        },
                        {
                          text: 'Sil',
                          onPress: async () =>
                            await AxiosClient.get(
                              `/api/vehicle/plan/delete/${item.id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${user.accessToken}`,
                                },
                              },
                            )
                              .then(() => {

                                setData(prevState => {
                                  if (prevState.length === 1) {
                                    return [];
                                  } else {
                                    const removedItem = prevState.splice(index, 1);
                                    return [...prevState];
                                  }
                                });
                                Alert.alert('Bilgi', 'Sipariş silindi', [
                                  { text: 'Tamam' },
                                ]);
                              })
                              .catch(function (error) {
                                console.error(error.message);
                                Alert.alert('Bilgi', 'İşlem başarısız', [
                                  { text: 'Tamam' },
                                ]);
                              }),
                        },
                        ,
                      ],
                    );
                  }}>
                  <Text style={HomeScreenCss.buttonsText}>Siparişi Sil</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View> : null

  );

  const onRefresh = useCallback(() => {
    axiosMethodOverload(
      'get',
      `/vehicle/plan/${user.vehicle_id}`,
      { Authorization: `Bearer ${user.accessToken}` },
      null,
      setData,
    );
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentInsetAdjustmentBehavior="automatic">
        <View style={HomeScreenCss.container}>
          <View style={HomeScreenCss.topRegionSize} />
          <View style={HomeScreenCss.bottomRegion}>
            <View style={HomeScreenCss.topRegionStyle}>
              <View style={HomeScreenCss.topRegionTextStyle}>
                <View style={HomeScreenCss.topRegionTextPlace}>
                  <Image style={{ width: 50, height: 50 }} source={Logo} />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginLeft: windowWidth / 18,
                    }}>
                    Sipariş Listesi
                  </Text>
                </View>
              </View>
            </View>
            <View style={HomeScreenCss.insideScrollViewParent}>
              {isLoading === false ? (
                <ScrollView
                  contentContainerStyle={
                    HomeScreenCss.scrollViewContentContainerSpinner
                  }
                  contentInsetAdjustmentBehavior="automatic">
                  <ActivityIndicator />
                </ScrollView>
              ) : typeof data !== 'undefined' && data.length > 0 ? (
                <View style={{ flex: 1 }}>
                  <ScrollView
                    contentContainerStyle={HomeScreenCss.scrollViewContentContainer}
                    contentInsetAdjustmentBehavior="automatic">
                    <View style={HomeScreenCss.containerList}>
                      <DraggableFlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        onDragEnd={({ data }) => {
                          let arrayRowNumber: string | any[] = [];
                          data.map(async index => {
                            arrayRowNumber.push(index.order_id);
                            await AxiosClient.post(
                              '/api/vehicle/plan/update',
                              {
                                vehicle_id: user.vehicle_id,
                                orders: arrayRowNumber,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${user.accessToken}`,
                                },
                              },
                            )
                              .then(response => { })
                              .catch(function (error) {
                                console.error(error);
                              });
                          });
                          Alert.alert('Bilgi', 'Siparişler yeniden sıralandı', [
                            { text: 'Tamam', onPress: () => onRefresh() },
                          ]);
                          setData(data);
                        }}
                      />
                    </View>
                  </ScrollView>
                </View>
              ) : (
                <ScrollView
                  contentContainerStyle={
                    HomeScreenCss.scrollViewContentContainerNoOrder
                  }
                  contentInsetAdjustmentBehavior="automatic"
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }>
                  <View style={HomeScreenCss.containerList}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#000',
                        textAlign: 'center',
                      }}>
                      Bugün siparişiniz bulunmuyor
                    </Text>
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </ScrollView >
    </View >
  );
};

export default HomeScreen;
