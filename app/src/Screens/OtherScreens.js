/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  VirtualizedList
} from 'react-native';
import analytics from '@react-native-firebase/analytics';

import { ListItem } from '../Components';
import { fetchData } from '../redux/actions';

class Notices extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', e =>
      analytics().logEvent('tab', {
        target: e.target
      })
    );
    this.props.fetchData();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  renderItem = ({ item }) => (
    <ListItem title={item.title} link={item.link} date={item.date} />
  );

  getItemCount = data => data.length;

  getItem = (data, index) => ({ ...data[index] });

  keyExtractor = item => item.link;

  refreshHandler = () => {
    analytics().logEvent('refresh');
    this.props.fetchData();
  };

  render() {
    const { fetchStatus, data } = this.props;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.body}>
          <VirtualizedList
            renderItem={this.renderItem}
            initialNumToRender={6}
            data={data}
            getItem={this.getItem}
            getItemCount={this.getItemCount}
            keyExtractor={this.keyExtractor}
            style={styles.body}
            refreshControl={
              <RefreshControl
                refreshing={fetchStatus}
                onRefresh={this.refreshHandler}
              />
            }
          />
          {/*<ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View
              style={styles.body}>
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
          </ScrollView>*/}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)'
  }
});

export default connect(
  (state, ownProps) => ({
    data: state.fetchedData.data[ownProps.tab],
    fetchStatus: state.fetchedData.fetchStatus.isFetching
  }),
  { fetchData }
)(Notices);
