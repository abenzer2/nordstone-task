import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalculatorScreen from '../screens/User/CalculatorScreen';
import NotificationScreen from '../screens/User/NotificationScreen';
import SaveTextScreen from '../screens/User/SaveTextScreen';
import UploadPhotoScreen from '../screens/User/UploadPhotoScreen';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();

function MainBottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => <Icon type="font-awesome" name="bell" size={20} />,
        }}
        name="Home"
        component={NotificationScreen}
      />
      <Tab.Screen
        name="Upload"
        component={UploadPhotoScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="md-cloud-upload-outline" type="ionicon" size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Save"
        component={SaveTextScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="chatbox-ellipses" type="ionicon" size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="calculator-outline" type="ionicon" size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainBottomNavigation;
