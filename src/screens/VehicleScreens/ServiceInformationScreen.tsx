import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Dimensions, Image } from 'react-native';
import Logo from '../../assets/images/truck.png';
import { useAuth } from '../../../AuthContext';
import { ServiceInformationScreenCss } from '../../assets/css/ServiceInformationScreenCss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import axiosMethodOverload from '../../utils/OverloadingAxios';

const ServiceInformationScreen = () => {
  const [user, setUser] = useAuth();
  const [service, setService] = useState();

  useEffect(() => {
    axiosMethodOverload('get', `/vehicle/service/${1}`, {
      Authorization: `Bearer ${user.accessToken}`,
    }, null, setService, null, setUser);
  }, []);

  return (
    <View style={ServiceInformationScreenCss.container}>
      <View style={ServiceInformationScreenCss.topRegionSize} />
      <View style={ServiceInformationScreenCss.bottomRegion}>
        <View style={ServiceInformationScreenCss.topRegionStyle}>
          <View style={ServiceInformationScreenCss.topRegionTextStyle}>
            <View style={ServiceInformationScreenCss.topRegionTextPlace}>
              <Image style={{ width: 50, height: 50 }} source={Logo} />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: windowWidth / 18,
                }}>
                Servis Bilgisi
              </Text>
            </View>
          </View>
        </View>
        <View style={ServiceInformationScreenCss.insideScrollViewParent}>
          <ScrollView
            contentContainerStyle={
              ServiceInformationScreenCss.scrollViewContentContainer
            }
            contentInsetAdjustmentBehavior="automatic">
            <View style={ServiceInformationScreenCss.containerList}>
              <View
                style={{
                  width: windowWidth / 1.3,
                  height: windowHeight * 0.3,
                  marginTop: windowHeight * 0.02,
                }}>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    borderBottomColor: 'gray',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      marginBottom: 10,
                    }}>
                    SERVİS ADI
                  </Text>
                  <Text
                    style={{
                      marginBottom: 5,
                    }}>
                    {service?.name}
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    borderBottomColor: 'gray',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      marginBottom: 10,
                    }}>
                    SERVİS YETKİLİSİ
                  </Text>
                  <Text
                    style={{
                      marginBottom: 5,
                    }}>
                    {service?.author}
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    borderBottomColor: 'gray',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      marginBottom: 10,
                    }}>
                    SERVİS TELEFON NUMARASI
                  </Text>
                  <Text
                    style={{
                      marginBottom: 5,
                    }}>
                    {service?.phone}
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    borderBottomColor: 'gray',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      marginBottom: 10,
                    }}>
                    SERVİS EMAIL ADRESİ
                  </Text>
                  <Text
                    style={{
                      marginBottom: 5,
                    }}>
                    {service?.email}
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    borderBottomColor: 'gray',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      marginBottom: 10,
                    }}>
                    SERVİS ADRESİ
                  </Text>
                  <Text
                    style={{
                      marginBottom: 5,
                    }}>
                    {service?.address}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ServiceInformationScreen;