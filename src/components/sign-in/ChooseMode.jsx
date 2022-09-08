import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../constants/theme';

const ChooseMode = ({hasAccount, setHasAccount}) => {
  if (hasAccount) {
    return (
      <View style={{flexDirection:'row'}}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => setHasAccount(false)}>
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
  } else
    return (
      <View style={{flexDirection:'row'}}>
        <Text>Have an account?</Text>
        <TouchableOpacity onPress={() => setHasAccount(true)}>
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

export default React.memo(ChooseMode);
