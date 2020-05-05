// @flow

import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/Octicons';
import analytics from '@react-native-firebase/analytics';

const dateString = (date: string): string => {
  const dateLocale = new Date(date);
  return dateLocale.toDateString();
};

const ListItemContent = ({ title }: { title: string }): React$Node => (
  <View>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ListItem = ({
  link,
  title,
  date
}: {
  link?: string,
  title: string,
  date?: string
}): React$Node => {
  const onPressLink = () => {
    analytics().logEvent('openedLink', {
      Link: link
    });
    Linking.openURL(link);
  };
  return (
    <View style={styles.MainContainer}>
      {link ? (
        <Touchable onPress={onPressLink} style={styles.ItemContainer}>
          <ListItemContent title={title} date={date} />
        </Touchable>
      ) : (
        <ListItemContent title={title} date={date} />
      )}
      {date && (
        <View style={styles.dateContainer}>
          <Icon name="calendar" size={18} color="#555" />
          <Text style={styles.dateText}>{dateString(date)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    marginVertical: 8,
    backgroundColor: '#fff'
  },
  ItemContainer: {
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: '#eef0f2',
    borderRadius: 12
  },
  title: {
    fontWeight: 'bold'
  },
  dateContainer: {
    marginHorizontal: 36,
    marginVertical: 4,
    flexDirection: 'row'
  },
  dateText: {
    marginLeft: 8,
    fontStyle: 'italic',
    color: '#555'
  }
});

export default ListItem;
