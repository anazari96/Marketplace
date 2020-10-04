/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {addOrder} from './src/utils/orderFuncs';

AppRegistry.registerComponent(appName, () => App);
