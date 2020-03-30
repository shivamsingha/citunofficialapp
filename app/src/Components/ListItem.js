// @flow

import React from 'react';
import { View, Text, Linking, StyleSheet, Dimensions } from 'react-native';
import Touchable from 'react-native-platform-touchable';

const ListItemContent: () => React$Node = ({
  title,
  date
}: {
  title: string,
  date: string
}) => (
  <View>
    <Text>{title}</Text>
    {date && <Text>{date}</Text>}
  </View>
);

const ListItem: () => React$Node = ({
  link,
  title,
  date
}: {
  link: string,
  title: string,
  date: string
}) => (
  <View>
    {link ? (
      <Touchable
        onPress={() => Linking.openURL(link)}
        style={styles.ItemContainer}>
        <ListItemContent title={title} date={date} />
      </Touchable>
    ) : (
      <ListItemContent title={title} date={date} />
    )}
  </View>
);

const styles = StyleSheet.create({
  ItemContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 16,
    backgroundColor: '#eef0f2',
    borderRadius: 16
  }
});

export default ListItem;
