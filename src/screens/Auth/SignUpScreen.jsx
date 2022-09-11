import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Pressable} from 'react-native';
import {Text} from 'react-native-elements';
import AuthHeader from '../../components/auth-screen/AuthHeader';
import SignUpForm from '../../components/auth-screen/SignUpForm';
import BackgroundLayout from '../../components/common/BackgroundLayout';
import {colors} from '../../constants/theme';

export default function SignUpScreen() {
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
          <AuthHeader title="Welcome," subtitle="Sign up to continue" />
        </View>
        <View style={{marginTop: 40}}>
          <SignUpForm />
        </View>
      </View>
    </BackgroundLayout>
  );
}
