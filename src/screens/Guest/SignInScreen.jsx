import React from 'react';
import {View, SafeAreaView} from 'react-native';
import SignInForm from '../../components/sign-in/SignInForm';
import SignInLogo from '../../components/sign-in/SignInLogo';
import {colors} from '../../constants/theme';

export default function SignInScreen() {
  return (
    <React.Fragment>
      <SafeAreaView>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SignInLogo />
          <SignInForm />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
}
