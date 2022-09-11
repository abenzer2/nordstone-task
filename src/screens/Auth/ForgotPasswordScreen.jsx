import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import AuthHeader from '../../components/auth-screen/AuthHeader';
import ForgotPasswordForm from '../../components/auth-screen/ForgotPasswordForm';
import ResetEmailForm from '../../components/auth-screen/ResetEmailForm';
import SignInForm from '../../components/auth-screen/SignInForm';
import BackgroundLayout from '../../components/common/BackgroundLayout';
import {colors} from '../../constants/theme';

export default function ForgotPasswordScreen() {
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
          <AuthHeader title="Reset Password," subtitle="Recover to continue" />
        </View>
        <View style={{marginTop: 40}}>
          <ResetEmailForm />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
          }}>
          <Text style={{marginRight: 2, fontSize: 16, fontWeight: '500'}}>
            Back to
          </Text>
          <Pressable onPress={() => navigate('SignIn')}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: colors.secondary,
              }}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </BackgroundLayout>
  );
}
