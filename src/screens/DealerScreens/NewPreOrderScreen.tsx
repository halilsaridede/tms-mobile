import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Input from '../../components/Input';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAuth } from '../../../AuthContext';

// component
import CustomizeButton from '../../components/CustomizeButton';
import { AxiosClient } from '../../client/AxiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Icon } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewPreOrderScreen = ({ navigation }) => {
  const [user] = useAuth();
  const [cityOpen, setCityOpen] = useState(false);
  const [cityValue, setCityValue] = useState(null);
  const [cityItems, setCityItems] = useState([{ label: '', value: '' }]);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [districtValue, setDistrictValue] = useState(null);
  const [districtItems, setDistrictItems] = useState([{ label: '', value: '' }]);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderValue, setOrderValue] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [orderHolderNameAndSurname, setOrderHolderNameAndSurname] =
    useState('');
  const [orderHolderPhoneNumber, setOrderHolderPhoneNumber] = useState('');
  const [orderHolderEmailAdress, setOrderHolderEmailAdress] = useState('');
  const [orderWeight, setOrderWeight] = useState('');
  const [orderHolderAddress, setOrderHolderAddress] = useState('');
  const [note, setNote] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [orderType, setOrderType] = useState();

  const getOrdersByCustomerId = async () => {
    await AxiosClient.get(`/api/dealer/list/${user.tms_id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(response => {
        let data:
          | ((
            prevState: { label: string; value: string }[],
          ) => { label: string; value: string }[])
          | { label: any; value: any }[] = [];
        response.data.products.map(item => {
          data.push({ label: item.name, value: item.id });
          setOrderItems(data);
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  const getCities = async () => {
    await AxiosClient.get(`/api/dealer/getCityName`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(response => {
        var data: [] = [];
        response.data.map(item => {
          data.push({ label: item.name, value: item.id });
          setCityItems(data);
        });
        return response.data;
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  const getDistricts = async () => {
    await AxiosClient.post(
      `/api/dealer/getDistrictName`,
      {
        // tax_department_city_id: 2,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then(response => {
        var data: [] = [];
        response.data.map(item => {
          data.push({ label: item.name, value: item.id });
          setDistrictItems(data);
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    getOrdersByCustomerId();
    getCities();
    getDistricts();
  }, []);

  const OrderListComponent = () => {
    return (
      <View>
        {orderList.map((item, index) => {
          return (
            <>
              <View
                style={{
                  width: windowWidth * 0.9,
                  height: windowHeight * 0.05,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: windowWidth * 0.7,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#000000',
                      marginLeft: windowWidth * 0.05,
                    }}>
                    {item.label}
                  </Text>
                </View>
                <View
                  style={{
                    width: windowWidth * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      width: windowWidth * 0.1,
                      height: windowHeight * 0.05,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#000000',
                      textAlign: 'center',
                      // will fix
                      padding: windowWidth * 0.03,
                    }}>
                    {item.count}
                  </Text>
                </View>
                <View
                  style={{
                    width: windowWidth * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => handleDeleteOrder(item.value)}
                    style={{
                      width: windowWidth * 0.1,
                      height: windowHeight * 0.05,
                      backgroundColor: 'red',
                      borderRadius: 10,
                      borderColor: '#F2F2F2',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      Sil
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        })}
      </View>
    );
  };

  const handleOrderList = () => {
    if (numberOfProduct === 0) {
      Alert.alert('Lütfen ürün adedi giriniz');
    } else {
      orderItems.find(item => {
        if (item.value === orderValue) {
          let checkValue = 0;
          let orderListJson = JSON.stringify(orderList);
          let obj = {
            label: item.label,
            value: item.value,
            count: numberOfProduct,
          };

          if (orderList.length !== 0) {
            orderList.map((item, index) => {
              if (item.value === obj.value) {
                checkValue = index;
              }
            });
            orderList[checkValue].value === obj.value
              ? Alert.alert('Bu ürün zaten sepetinizde mevcut')
              : setOrderList(prevState => [...prevState, obj]);
          } else {
            setOrderList(prevState => [...prevState, obj]);
          }
        }
      });
    }
  };

  const handleDeleteOrder = value => {
    setOrderList(orderList.filter(item => item.value !== value));
  };

  const handleSavePreorder = async () => {
    let productIdArray: string | any[] = [];
    let productCountArray: string | any[] = [];
    let bodyFormData = new FormData();
    orderList.map((item, index) => {
      productIdArray.push(item.value);
      productCountArray.push(item.count);
      bodyFormData.append('productId[]', productIdArray);
      bodyFormData.append('productCount[]', productCountArray);
    });
    await AxiosClient.post(
      '/api/dealer/add',
      {
        customer_id: user.tms_id,
        order_type: orderType,
        orderer_name: orderHolderNameAndSurname,
        orderer_phone: orderHolderPhoneNumber,
        orderer_email: orderHolderEmailAdress,
        weight: orderWeight,
        city_id: cityValue,
        district_id: districtValue,
        address_description: orderHolderAddress,
        note: note,
        productId: productIdArray,
        productCount: productCountArray,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then(async function (response) {
        Alert.alert('Uyarı', 'Ön sipariş oluşturuldu', [{ text: 'Tamam' }]);
        navigation.navigate('Tüm Ön Siparişler');
      })
      .catch(function (error) {
        console.error(error.message);
        Alert.alert('Uyarı', 'Ön sipariş oluşturulamadı', [{ text: 'Tamam' }]);
      })
      .finally(() => { });
  };

  const getDistrictNameList = async () => {
    await AxiosClient.post(
      `/api/dealer/getDistrictName`,
      {
        tax_department_city_id: cityValue,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then(async response => {
        let data:
          | ((
            prevState: { label: string; value: string }[],
          ) => { label: string; value: string }[])
          | { label: any; value: any }[] = [];
        await response.data.map(item => {
          data.push({ label: item.name, value: item.id });
        });
        setDistrictItems(data);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  districtOpen === true ? getDistrictNameList() : null;


  const checkBoxHandler = () => {
    if (checked == false) {
      setChecked(true);
      setChecked2(false);
      setOrderType(1);
    } else {
      setChecked(false);
    }
  };

  const checkBoxHandler2 = () => {
    if (checked2 == false) {
      setChecked2(true);
      setChecked(false);
      setOrderType(2);
    } else {
      setChecked2(false);
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
            <Text>Sipariş Türü :</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text>NORMAL</Text>
            <Icon
              name={checked ? "radio-button-checked" : "radio-button-unchecked"}
              size={20}
              onPress={checkBoxHandler}
              tvParallaxProperties={undefined}
            />
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
          }}>
            <Text>HIZLI</Text>
            <Icon
              name={checked2 ? "radio-button-checked" : "radio-button-unchecked"}
              size={20}
              onPress={checkBoxHandler2}
              tvParallaxProperties={undefined}
            />
          </View>
        </View>
        <Input
          placeholderText={'Sipariş sahibinin adı-soyadı giriniz'}
          keyboardTypeDefinition={undefined}
          secureTextEntryDefinition={false}
          passwordTextControl={false}
          onChangeTextHandle={setOrderHolderNameAndSurname}
          valueText={orderHolderNameAndSurname}
        />
        <Input
          placeholderText={'Sipariş sahibinin telefon numarası giriniz'}
          keyboardTypeDefinition={undefined}
          secureTextEntryDefinition={false}
          passwordTextControl={false}
          onChangeTextHandle={setOrderHolderPhoneNumber}
          valueText={orderHolderPhoneNumber}
        />
        <Input
          placeholderText={'Sipariş sahibinin e-mail adresi giriiniz'}
          keyboardTypeDefinition={undefined}
          secureTextEntryDefinition={false}
          passwordTextControl={false}
          onChangeTextHandle={setOrderHolderEmailAdress}
          valueText={orderHolderEmailAdress}
        />
        <Input
          placeholderText={'Ürünün ağırlığını giriniz'}
          keyboardTypeDefinition={undefined}
          secureTextEntryDefinition={false}
          passwordTextControl={false}
          onChangeTextHandle={setOrderWeight}
          valueText={orderWeight}
        />
        <View
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.08,
            zIndex: 1000,
          }}>
          <DropDownPicker
            open={cityOpen}
            value={cityValue}
            items={cityItems}
            setOpen={setCityOpen}
            setValue={setCityValue}
            setItems={setCityItems}
            placeholder={'Şehir seçiniz'}
          />
        </View>
        <View
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.07,
            zIndex: 900,
          }}>
          <DropDownPicker
            open={districtOpen}
            value={districtValue}
            items={districtItems}
            setOpen={setDistrictOpen}
            setValue={setDistrictValue}
            setItems={setDistrictItems}
            placeholder={'İlçe seçiniz'}
          />
        </View>
        <Input
          placeholderText={'Adres tarifi giriniz'}
          keyboardTypeDefinition={undefined}
          secureTextEntryDefinition={false}
          passwordTextControl={false}
          onChangeTextHandle={setOrderHolderAddress}
          valueText={orderHolderAddress}
        />
        <Input
          placeholderText={'Not giriniz'}
          keyboardTypeDefinition={undefined}
          secureTextEntryDefinition={false}
          passwordTextControl={false}
          onChangeTextHandle={setNote}
          valueText={note}
        />
        <View
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 800,
          }}>
          <View
            style={{
              width: windowWidth * 0.7,
              flexDirection: 'row',
            }}>
            <DropDownPicker
              open={orderOpen}
              value={orderValue}
              items={orderItems}
              setOpen={setOrderOpen}
              setValue={setOrderValue}
              setItems={setOrderItems}
              placeholder={'Siparişi seçiniz'}
            />
            <TextInput
              style={{
                width: windowWidth * 0.1,
                height: windowHeight * 0.06,
                backgroundColor: '#fff',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#000000',
                textAlign: 'center',
              }}
              value={numberOfProduct}
              onChangeText={text => setNumberOfProduct(text)}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
          <View style={{}}>
            <TouchableOpacity
              onPress={handleOrderList}
              style={{
                width: windowWidth * 0.1,
                height: windowHeight * 0.05,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'blue',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                Ekle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              width: windowWidth * 0.77,
              marginLeft: windowWidth * 0.02,
              height: windowHeight * 0.03,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Ürün Adı
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Adet
            </Text>
          </View>
          <View>
            <OrderListComponent />
          </View>
        </View>
        <CustomizeButton
          insideText={'Kaydet'}
          onPressHandle={handleSavePreorder}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewPreOrderScreen;
