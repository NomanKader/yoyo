// src/components/NetworkStatusBanner.js

import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NetworkContext} from '../contexts/NetworkProvider';
import theme from '../styles/colors';

const NetworkStatusBanner = () => {
  const {isConnected} = useContext(NetworkContext);

  if (isConnected) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>You are offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.error,
    padding: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NetworkStatusBanner;
