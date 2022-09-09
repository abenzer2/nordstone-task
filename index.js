/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { configureNotification, createChannel } from './src/utils/notification-helpers';

AppRegistry.registerComponent(appName, () => {
    configureNotification();
    createChannel('nordstone-channel');
    return App
});
