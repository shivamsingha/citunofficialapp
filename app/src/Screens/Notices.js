/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import { ListItem } from '../Components';
import { relativeHeight } from '../utils';

const { Value, interpolate, Extrapolate, set } = Animated;

class Notices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Value(0)
    };
  }

  componentDidMount() {
    this.props.fetchData();
  }

  imageOpacity = () =>
    interpolate(this.state.scrollY, {
      inputRange: [0, 150],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

  imageSize = () =>
    interpolate(this.state.scrollY, {
      inputRange: [0, 150],
      outputRange: [1.0, 0.3],
      extrapolate: Extrapolate.CLAMP
    });

  imageTranslateY = () =>
    interpolate(this.state.scrollY, {
      inputRange: [0, 150],
      outputRange: [0, -105],
      extrapolate: Extrapolate.CLAMP
    });

  render() {
    const { fetchStatus, data } = this.props;
    const { scrollY } = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Animated.Image
            source={require('../../assets/Logo.png')}
            resizeMode="contain"
            style={[
              styles.headerBackground,
              {
                opacity: this.imageOpacity(),
                transform: [
                  { scale: this.imageSize() },
                  { translateY: this.imageTranslateY() }
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
              {data &&
                data.notices.map(obj => (
                  <ListItem
                    key={obj.link}
                    link={obj.link}
                    date={obj.date}
                    title={obj.title}
                  />
                ))}
            </View>
          </Animated.ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    width: 'auto',
    zIndex: 10
  },
  body: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)'
  },
  headerBackground: {
    height: relativeHeight(30),
    width: '100%',
    alignSelf: 'center',
    zIndex: 200,
    position: 'absolute'
  }
});

export default connect(
  state => state.fetchedData,
  { fetchData }
)(Notices);
