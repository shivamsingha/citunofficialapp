/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import messaging from '@react-native-firebase/messaging';

import { Happenings, News, Notices, Tenders } from './Screens';
import { persistor, store } from './redux';
import { fetchData } from './redux/actions';

enableScreens();

const Tab = createMaterialBottomTabNavigator();

const App: () => React$Node = () => {
  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
  }

  async function requestPermission() {
    const granted = await messaging().requestPermission();

    if (granted) {
      console.log('User granted messaging permissions!');
    } else {
      console.log('User declined messaging permissions :(');
    }
  }

  async function subscribeTopic() {
    await messaging().subscribeToTopic('allDevices');
  }

  useEffect(() => {
    registerAppWithFCM();
    requestPermission();
    subscribeTopic();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage.data);
      fetchData();
    });
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator shifting={true}>
            <Tab.Screen
              name="Notices"
              component={Notices}
              options={{
                tabBarColor: '#2650a5',
                tabBarIcon: ({ color }) => (
                  <Icon name="notification" color={color} size={26} />
                )
              }}
            />
            <Tab.Screen
              name="News"
              component={News}
              options={{
                tabBarColor: '#38c172',
                tabBarIcon: ({ color }) => (
                  <Icon name="copy1" color={color} size={26} />
                )
              }}
            />
            <Tab.Screen
              name="Tenders"
              component={Tenders}
              options={{
                tabBarColor: '#ef5753',
                tabBarIcon: ({ color }) => (
                  <Icon name="book" color={color} size={26} />
                )
              }}
            />
            <Tab.Screen
              name="Happenings"
              component={Happenings}
              options={{
                tabBarColor: '#9561e2',
                tabBarIcon: ({ color }) => (
                  <Icon name="rocket1" color={color} size={26} />
                )
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
