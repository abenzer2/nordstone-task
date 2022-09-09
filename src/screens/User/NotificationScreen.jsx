import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { showNotification } from '../../utils/notification-helpers'
import auth from '@react-native-firebase/auth';

const NotificationScreen = () => {

  const triggerNotification = () => {
   showNotification()
  }
  const handleLogout = () => {
    console.log('loging out');
    auth().signOut();
  };
  return (
    <View style={styles.container}>
      <Button title='Trigger Notification' onPress={triggerNotification} />
      
      <Button title='log out' onPress={handleLogout} />
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    height: '100%'
  }
})