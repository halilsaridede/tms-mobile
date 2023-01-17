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
} from 'react-native';

import DraggableFlatList from 'react-native-draggable-flatlist';
import { useAuth } from '../../../AuthContext';
import { AxiosClient } from '../../client/AxiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreenCss } from '../../assets/css/HomeScreenCss';
import Logo from '../../assets/images/order.png';
import axiosMethodOverload from '../../utils/OverloadingAxios';
import { formatDate } from '../../utils/Helpers';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const initialData: any[] | (() => any[]) = [];

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

type Props = {
  onChangeText: () => void;
  onPress: () => void;
  text?: string;
};

const AllPreOrder = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [user, setUser] = useAuth();

  useFocusEffect(
    useCallback(() => {
      axiosMethodOverload(
        'get',
        `/dealer/type/${user.tms_id}`,
        { Authorization: `Bearer ${user.accessToken}` },
        null,
        setData,
        setIsLoading(true),
        setUser,
      );
    }, []),
  );

  const renderItem = ({ item, index }) => (
    <View style={HomeScreenCss.item}>
      <TouchableOpacity activeOpacity={1}>
        <View style={HomeScreenCss.orderIdPrintPlace}>
          <Text style={HomeScreenCss.orderIdPrintPlaceText}>
            Ön Sipariş#
            {item.id}
          </Text>
          <Text style={{ color: 'black' }}>{item.orderer_name}</Text>
        </View>
        <View style={HomeScreenCss.orderDetailsPlace}>
          <Text>{item.address_description}</Text>
          <Text>{item.orderer_phone}</Text>
          <Text>{item.orderer_email}</Text>
        </View>
        <View style={HomeScreenCss.orderDetailsOrderDateAndButtonsPlace}>
          <Text style={{ color: 'gray' }}>Sipariş Tarihi {formatDate(item.created_at)}</Text>
          {

            <>
              <TouchableOpacity
                style={HomeScreenCss.updateButton}
                onPress={() => {
                  let id = JSON.stringify(item.id);
                  AsyncStorage.setItem('itemIdGetFromPreOrder', id);
                  navigation.navigate('Ön Siparişi Güncelle', {
                    id,
                  });
                }}>
                <Text style={HomeScreenCss.buttonsText}>
                  Ön Siparişi Güncelle
                </Text>
              </TouchableOpacity>
              <View style={{ height: 5 }} />
              <TouchableOpacity
                style={HomeScreenCss.deleteButton}
                onPress={() => {
                  Alert.alert(
                    'Sipariş Silinsin mi ?',
                    'Siparişi listeden silinecek',
                    [
                      {
                        text: 'İptal',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Sil',
                        onPress: async () =>
                          await AxiosClient.get(
                            `/api/dealer/delete/${item.id}`,
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
                                  const removed = prevState.splice(index, 1);
                                  return [...prevState];
                                }
                              });
                              Alert.alert('Bilgi', 'Ön Sipariş silindi', [
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
                <Text style={HomeScreenCss.buttonsText}>Ön Siparişi Sil</Text>
              </TouchableOpacity>
            </>
          }
        </View>
      </TouchableOpacity>
    </View>
  );

  const onRefresh = useCallback(() => {
    axiosMethodOverload(
      'get',
      `/dealer/type/${user.tms_id}`,
      { Authorization: `Bearer ${user.accessToken}` },
      null,
      setData,
      setIsLoading(true),
      setUser,
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
                  <Image
                    style={{
                      width: windowWidth * 0.16,
                      height: windowHeight * 0.08,
                    }}
                    source={Logo}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginLeft: windowWidth / 18,
                      color: 'black',
                    }}>
                    Ön Sipariş Listesi
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
                <ScrollView
                  contentContainerStyle={HomeScreenCss.scrollViewContentContainer}
                  contentInsetAdjustmentBehavior="automatic">
                  <View style={HomeScreenCss.containerList}>
                    <DraggableFlatList
                      data={data}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      onDragEnd={({ data }) => {
                        Alert.alert('Bilgi', 'Siparişler yeniden sıralandı');
                        let arrayRowNumber: string | any[] = [];
                        data.map(async index => {
                          arrayRowNumber.push(index.order_id);
                          await AxiosClient.post(
                            '/api/vehicle/plan/update',
                            {
                              vehicle_id: user.vehicleId,
                              orders: arrayRowNumber,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${user.accessToken}`,
                              },
                            },
                          )
                            .then(response => {
                              console.log('Update planned!!');
                            })
                            .catch(function (error) {
                              console.error(error);
                            });
                        });
                        setData(data);
                      }}
                    />
                  </View>
                </ScrollView>
              ) : (
                <ScrollView
                  contentContainerStyle={
                    HomeScreenCss.scrollViewContentContainerNoOrder
                  }
                  contentInsetAdjustmentBehavior="automatic">
                  <View style={HomeScreenCss.containerList}>
                    <Text>Bugün ön siparişiniz bulunmuyor</Text>
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AllPreOrder;
