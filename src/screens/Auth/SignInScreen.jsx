import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import AuthHeader from '../../components/auth-screen/AuthHeader';
import SignInForm from '../../components/auth-screen/SignInForm';
import BackgroundLayout from '../../components/common/BackgroundLayout';

export default function SignInScreen() {
  const {navigate} = useNavigation();

  return (
    <BackgroundLayout>
      <View
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 40,
        }}>
        <View style={{marginTop: 80}}>
          <AuthHeader title="Welcome," subtitle="Sign in to continue" />
        </View>
        <View style={{marginTop: 40}}>
          <SignInForm />
        </View>
      </View>
    </BackgroundLayout>
  );
}
