import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import SplashScreen from '../../screens/Guest/SplashScreen';
import AuthNavigation from '../../navigations/AuthNavigation';
import MainBottomNavigation from '../../navigations/MainBottomNavigation';

function AuthGuard() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {};
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing || loading) return <SplashScreen />;

  if (!user) {
    return <AuthNavigation />;
  }

  return <MainBottomNavigation />;
}

export default AuthGuard;
