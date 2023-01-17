import React from 'react';
import {Alert, Text} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const ImageHandleHelper = (setImage: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: string): void; }) => {
  return Alert.alert('Seçenek', 'Kamera seç', [
    {
      text: 'Galeri',
      onPress: () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          setImage(image.path);
        });
      },
    },
    {
      text: 'Kamera',
      onPress: () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          setImage(image.path);
        });
      },
    },
  ]);
};

export const formatDate = (date: string) => {
  let year, month, day, hour, minute, newDate;
  year = date.split('-')[0];
  month = date.split('-')[1];
  day = date.split('-')[2].split('T')[0];
  hour = date.split('T')[1].split(':')[0];
  minute = date.split('T')[1].split(':')[1];
  newDate = day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
  return newDate;
};

export const checkBoxHandle = (setChecked2: { (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }, checked2: boolean, setChecked: { (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }, setDataType: { (value: React.SetStateAction<undefined>): void; (arg0: any): void; }, dataType: string) => {
  setChecked2 = setChecked2;
  checked2 = checked2;
  setChecked = setChecked;
  setDataType = setDataType;
  dataType = dataType;
  if (checked2 == false) {
    setChecked2(true);
    setChecked(false);
    setDataType(dataType);
  } else {
    setChecked2(false);
  }
};