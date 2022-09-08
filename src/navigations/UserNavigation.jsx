import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainBottomNavigation from './MainBottomNavigation';

export default function UserNavigation() {
  return (
    <NavigationContainer>
        <MainBottomNavigation />
    </NavigationContainer>
  );
}