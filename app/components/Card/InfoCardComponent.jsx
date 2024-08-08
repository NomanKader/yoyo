import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoCardComponent = ({ title,value }) => {
  return (
    <View style={styles.statusContainer}>
      <Text style={styles.leftText}>{title}</Text>
      <Text style={styles.rightText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    width: 340,
    height: 60,
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  leftText: {
    color: '#2F343A',
    fontWeight: '400',
    fontSize: 14,
    marginLeft:10
  },
  rightText: {
    color: '#2F343A',
    fontWeight: '500',
    fontSize: 16,
    marginRight:45
  },
});

export default InfoCardComponent;
