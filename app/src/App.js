/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import Notices from './Screens/Notices';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
import messaging from '@react-native-firebase/messaging';

enableScreens();

const Tab = createMaterialBottomTabNavigator();

const App: () => React$Node = () => {
  async function registerAppWithFCM() {
    await messaging().registerForRemoteNotifications();
  }

  async function requestPermission() {
    const granted = await messaging().requestPermission();

    if (granted) {
      console.log('User granted messaging permissions!');
    } else {
      console.log('User declined messaging permissions :(');
    }
  }
  useEffect(() => {
    registerAppWithFCM();
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage.data);
    });
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Notices" component={Notices} />
            <Tab.Screen name="News" component={LearnMoreLinks} />
            <Tab.Screen name="Tenders" component={LearnMoreLinks} />
            <Tab.Screen name="Happenings" component={LearnMoreLinks} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
