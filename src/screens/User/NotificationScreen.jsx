import { View, Text, Button } from 'react-native'
import React from 'react'
import { showNotification } from '../../utils/notification-helpers'

const NotificationScreen = () => {

  const triggerNotification = () => {
   showNotification()
  }
  return (
    <View>
      <Button title='Trigger Notification' onPress={triggerNotification} />
    </View>
  )
}

export default NotificationScreen