import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import SplashScreen from './Guest/SplashScreen';
import AuthScreen from './Guest/AuthScreen';
import MainBottomNavigation from '../navigations/MainBottomNavigation';
import UserNavigation from '../navigations/UserNavigation';

function AuthGuard() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLogout = () => {
    console.log('loging out');
    auth().signOut();
  };

  if (initializing) return <SplashScreen />;

  if (!user) {
    return <AuthScreen />;
  }

  return (
      <MainBottomNavigation />
  );
}

export default AuthGuard;
