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
  SafeAreaView,
  StyleSheet,
  StatusBar,
  VirtualizedList
} from 'react-native';

import { ListItem } from '../Components';
import { fetchData } from '../redux/actions';

class Notices extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  renderItem = ({ item }) => (
    <ListItem title={item.title} link={item.link} date={item.date} />
  );

  getItemCount = data => data.length;

  getItem = (data, index) => ({ ...data[index] });

  keyExtractor = item => item.link;

  render() {
    const { data } = this.props;
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
  (state, ownProps) => ({ data: state.fetchedData.data[ownProps.tab] }),
  { fetchData }
)(Notices);