import {launchCamera } from 'react-native-image-picker';
import { cameraOptions } from './camera-options';

export const captureImage = (callback) => {
    launchCamera(cameraOptions, response => {
      console.log('Response = 1 ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response);
        callback(response.assets[0]);
      }
    });
  };