/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';

import Animated from 'react-native-reanimated';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';

const { width, height } = Dimensions.get('window');
const realWidth = height > width ? width : height;
const realHeight = height > width ? height : width;
const relativeWidth = num => (realWidth * num) / 100;
const relativeHeight = num => (realHeight * num) / 100;

const { Value, interpolate, Extrapolate, set } = Animated;

const App: () => React$Node = () => {
  const [scrollY] = useState(new Value(0));

  const imageOpacity = () =>
    interpolate(scrollY, {
      inputRange: [0, 150],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

  const imageSize = () =>
    interpolate(scrollY, {
      inputRange: [0, 150],
      outputRange: [1.0, 0.3],
      extrapolate: Extrapolate.CLAMP
    });

  const imageTranslateY = () =>
    interpolate(scrollY, {
      inputRange: [0, 150],
      outputRange: [0, -105],
      extrapolate: Extrapolate.CLAMP
    });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Animated.Image
          source={require('../../assets/Logo.png')}
          resizeMode="contain"
          style={[
            stylesHeader.background,
            {
              opacity: imageOpacity(),
              transform: [
                { scale: imageSize() },
                { translateY: imageTranslateY() }
              ]
            }
          ]}
        />
        <Animated.ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: y => set(scrollY, y) } }
              }
            ],
            { useNativeDriver: true }
          )}>
          <View
            style={[
              styles.body,
              { transform: [{ translateY: relativeHeight(30) }] }
            ]}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    width: 'auto',
    zIndex: 10
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

const stylesHeader = StyleSheet.create({
  background: {
    height: relativeHeight(30),
    width: '100%',
    alignSelf: 'center',
    zIndex: 200,
    position: 'absolute'
  },
  background2: {
    zIndex: 200,
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: -128,
    marginBottom: -192
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black
  }
});

export default App;
