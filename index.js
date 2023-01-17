import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const MyTaskService = () => {
    
};

const interval = setInterval(() => {
    // console.log('Hello from background service');
}, 1000);

AppRegistry.registerHeadlessTask('SomeTaskName', () => interval());
AppRegistry.registerComponent(appName, () => App);
