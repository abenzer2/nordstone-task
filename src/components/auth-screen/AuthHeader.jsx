import {View} from 'react-native';
import {Text} from 'react-native-elements'
import React from 'react';
import {colors} from '../../constants/theme';

const AuthHeader = ({title, subtitle}) => {
  return (
    <View>
      <Text
        style={{
          color: colors.primary,
          fontSize: 32,
          fontWeight: 'bold'
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: colors.mediumGray,
          fontSize: 16,
          fontWeight: 'bold',
          marginTop:4
        }}>
        {subtitle}
      </Text>
    </View>
  );
};

export default AuthHeader;
