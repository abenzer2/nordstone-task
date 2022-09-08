import React, { useCallback, useState } from 'react';
import {View, SafeAreaView} from 'react-native';
import AuthScreenLogo from '../../components/auth-screen/AuthScreenLogo';
import ChooseAuthMode from '../../components/auth-screen/ChooseAuthMode';
import ForgotPasswordForm from '../../components/auth-screen/ForgotPasswordForm';
import SignInForm from '../../components/auth-screen/SignInForm';
import SignUpForm from '../../components/auth-screen/SignUpForm';

export default function AuthScreen() {
  
  const [authMode, setAuthMode] = useState('sign-in');

  const handleSetAuthModeChange = useCallback(value => {
    setAuthMode(value);
  }, []);

  const AuthForm = () => {
    if(authMode == 'sign-in') {
      return <SignInForm setAuthMode={handleSetAuthModeChange}/>
    }
    if(authMode == 'sign-up') {
      return <SignUpForm />
    }
    if( authMode == 'forgot-password') {
      return <ForgotPasswordForm />
    }
  }

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
          <AuthScreenLogo />
          <AuthForm />
          <View style={{marginTop:30}}>
          <ChooseAuthMode authMode={authMode} setAuthMode={handleSetAuthModeChange} />
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
}
