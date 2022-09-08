import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../constants/theme';

const ChooseAuthMode = ({authMode, setAuthMode}) => {
  if (authMode == 'sign-in') {
    return (
      <View style={{flexDirection:'row'}}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => setAuthMode('sign-up')}>
          <Text
            style={{
              color: colors.primary,
              textDecorationLine: 'underline',
              marginLeft:4,
              marginRight:4
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
          <Text>here</Text>
      </View>
    );
  } 
  else if(authMode== 'forgot-password') {
    return (
      <View style={{flexDirection:'row'}}>
        <Text>Back to</Text>
        <TouchableOpacity onPress={() => setAuthMode('sign-in')}>
          <Text
            style={{
              color: colors.primary,
              textDecorationLine: 'underline',
              marginLeft:4,
              marginRight:4
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  else
    return (
      <View style={{flexDirection:'row'}}>
        <Text>Have an account?</Text>
        <TouchableOpacity onPress={() => setAuthMode('sign-in')}>
          <Text
            style={{
              color: colors.primary,
              textDecorationLine: 'underline',
              marginLeft:4,
              marginRight:4
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
          <Text>here</Text>
      </View>
    );
};

export default React.memo(ChooseAuthMode);
