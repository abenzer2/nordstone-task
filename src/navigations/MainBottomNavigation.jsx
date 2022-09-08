import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalculatorScreen from '../screens/User/CalculatorScreen';
import NotificationScreen from '../screens/User/NotificationScreen';
import SaveTextScreen from '../screens/User/SaveTextScreen';
import UploadPhotoScreen from '../screens/User/UploadPhotoScreen';


const Tab = createBottomTabNavigator();

function MainBottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={NotificationScreen} />
      <Tab.Screen name="Upload" component={UploadPhotoScreen} />
      <Tab.Screen name="Save" component={SaveTextScreen} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
    </Tab.Navigator>
  );
}

export default MainBottomNavigation