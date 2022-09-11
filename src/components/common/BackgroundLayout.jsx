import React from 'react';
import {ImageBackground, ScrollView, StyleSheet} from 'react-native';

export default function BackgroundLayout({children,variant='network'}) {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={
        variant === 'vector' ?
        require('../../assets/images/vector-background.jpg')
        :
        require('../../assets/images/sign-in-background.jpg')}>
      <ScrollView contentContainerStyle={{height:'100%'}}>
        {children}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    height:'100%'
  }
});
