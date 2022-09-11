import {View} from 'react-native';
import React from 'react';
import {showNotification} from '../../utils/notification-helpers';
import auth from '@react-native-firebase/auth';
import BackgroundLayout from '../../components/common/BackgroundLayout';
import {FAB, Button, Icon} from 'react-native-elements';
import {colors} from '../../constants/theme';

const NotificationScreen = () => {
  const triggerNotification = () => {
    showNotification();
  };
  const handleLogout = () => {
    console.log('loging out');
    auth().signOut();
  };
  return (
    <BackgroundLayout variant="vector">
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          title="Trigger Notification"
          onPress={triggerNotification}
          buttonStyle={{
            backgroundColor: colors.red,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        />
        <Icon
          reverse
          name="log-out-outline"
          type="ionicon"
          color={colors.primary}
          raised
          onPress={handleLogout}
          containerStyle={{
            position: 'absolute',
            top: 10,
            right: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 20,
            elevation: 20,
          }}
        />
      </View>
    </BackgroundLayout>
  );
};

export default NotificationScreen;
