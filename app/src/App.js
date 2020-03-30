/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LearnMoreLinks, Colors } from 'react-native/Libraries/NewAppScreen';
import Notices from './Screens/Notices';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';

enableScreens();

const Tab = createMaterialBottomTabNavigator();

const App: () => React$Node = () => (
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  }
});

export default App;
