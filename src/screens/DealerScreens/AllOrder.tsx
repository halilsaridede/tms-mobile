import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useAuth } from '../../../AuthContext';
import { AllOrderByCustomer } from '../../assets/css/AllOrderByCustomer';
import Logo from '../../assets/images/order.png';
import DropDownPicker from 'react-native-dropdown-picker';
import { formatDate } from '../../utils/Helpers';
import axiosMethodOverload from '../../utils/OverloadingAxios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { OrderStatus } from '../../assets/constant/index';

const initialData: any[] | (() => any[]) = [];

type Props = {
  onChangeText: () => void;
  onPress: () => void;
  text?: string;
};

const AllOrder = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [user, setUser] = useAuth();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [orderStatusOpen, setOrderStatusOpen] = useState(false);
  const [orderStatusValue, setOrderStatusValue] = useState(null);
  const [orderStatusItems, setOrderStatusItems] = useState([
    { label: 'Sipariş alındı', value: 1 },
    { label: 'Araçta', value: 2 },
    { label: 'Adreste', value: 3 },
    { label: 'Keşifte', value: 4 },
    { label: 'Kuruluma uygun', value: 5 },
    { label: 'Kuruluma uygun değil', value: 6 },
    { label: 'Kuruldu', value: 7 },
    { label: 'Teslim edildi', value: 8 },
    { label: 'İptal edildi', value: 9 },
  ]);

  useFocusEffect(
    useCallback(() => {
      axiosMethodOverload(
        'post',
        `/dealer/order/all/${user.tms_id}`,
        { Authorization: `Bearer ${user.accessToken}` },
        null,
        setData,
        setIsLoading(true),
        setUser,
      );

    }, []),
  );

  const renderItem = ({ item, index, drag, isActive }) => (
    <View style={AllOrderByCustomer.item}>
      <TouchableOpacity activeOpacity={1}>
        <View style={AllOrderByCustomer.orderIdPrintPlace}>
          <Text style={AllOrderByCustomer.orderIdPrintPlaceText}>
            {item.orderer_name}
          </Text>
        </View>
        <View style={AllOrderByCustomer.orderDetailsPlace}>
          <Text>{item.address_description}</Text>
          <Text>{item.orderer_phone}</Text>
          <Text>{item.orderer_email}</Text>
        </View>
        <View style={AllOrderByCustomer.orderDetailsOrderDateAndButtonsPlace}>
          <Text style={{ color: 'gray' }}>Sipariş Durumu : {OrderStatus[item.status]}</Text>
          <Text style={{ color: 'gray' }}>Sipariş Tarihi : {formatDate(item.created_at)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const handleGetOrder = () => {
    let createdAt = date;
    let statusData;
    orderStatusValue === null ? statusData = 1 : statusData = orderStatusValue;
    let sendData = {
      created_at: createdAt,
      status: statusData,
    };
    axiosMethodOverload(
      'post',
      `/dealer/order/all/${user.tms_id}`,
      { Authorization: `Bearer ${user.accessToken}` },
      sendData,
      setData,
      setIsLoading(true),
      setUser,
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        contentInsetAdjustmentBehavior="automatic">
        <View style={AllOrderByCustomer.container}>
          <View style={AllOrderByCustomer.topRegionSize} />
          <View style={AllOrderByCustomer.bottomRegion}>
            <View style={AllOrderByCustomer.topRegionStyle}>
              <View style={AllOrderByCustomer.topRegionTextStyle}>
                <View style={AllOrderByCustomer.topRegionTextPlace}>
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
                    Tüm Siparişler
                  </Text>
                </View>
              </View>
            </View>
            <View style={AllOrderByCustomer.insideScrollViewParent}>
              <View
                style={{
                  width: windowWidth * 0.9,
                  height: windowHeight * 0.1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                  zIndex: 1,
                }}>
                <View
                  style={{
                    width: windowWidth * 0.3,
                    height: windowHeight * 0.06,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                  }}>
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Tarih seçiniz
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{
                  width: windowWidth * 0.3,
                  height: windowHeight * 0.05,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                  <DropDownPicker
                    open={orderStatusOpen}
                    value={orderStatusValue}
                    items={orderStatusItems}
                    setOpen={setOrderStatusOpen}
                    setValue={setOrderStatusValue}
                    setItems={setOrderStatusItems}
                    placeholder={'Durum seçiniz'}
                  />
                </View>
                <DatePicker
                  modal
                  mode='date'
                  title={'Tarih seçiniz'}
                  confirmText='Onayla'
                  cancelText='İptal'
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <TouchableOpacity
                  onPress={handleGetOrder}
                  style={{
                    width: windowWidth * 0.2,
                    height: windowHeight * 0.06,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text style={{
                    color: 'black',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>Getir</Text>
                </TouchableOpacity>
              </View>
              {isLoading === false ? (
                <ScrollView
                  contentContainerStyle={
                    AllOrderByCustomer.scrollViewContentContainerSpinner
                  }
                  contentInsetAdjustmentBehavior="automatic">
                  <ActivityIndicator />
                </ScrollView>
              ) : typeof data !== 'undefined' && data.length > 0 ? (
                <ScrollView
                  contentContainerStyle={AllOrderByCustomer.scrollViewContentContainer}
                  contentInsetAdjustmentBehavior="automatic">
                  <View style={AllOrderByCustomer.containerList}>
                    <DraggableFlatList
                      data={data}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                    // onDragEnd={({data}) => {}}
                    />
                  </View>
                </ScrollView>
              ) : (
                <ScrollView
                  contentContainerStyle={
                    AllOrderByCustomer.scrollViewContentContainerNoOrder
                  }
                  contentInsetAdjustmentBehavior="automatic">
                  <View style={AllOrderByCustomer.containerList}>
                    <Text>Bugüne ait siparişiniz bulunmuyor</Text>
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

export default AllOrder;
