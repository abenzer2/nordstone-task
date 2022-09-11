import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';

export default function SplashScreen() {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
      }}>
      <Image
        source={require('../../assets/images/logo_transparent.png')}
        style={{
          height: 200,
          width: 200,
          borderRadius: 100,
          marginBottom: 20,
        }}
      />
      <View style={{marginTop:20}}>
        <ActivityIndicator />
      </View>
    </View>
  );
}
