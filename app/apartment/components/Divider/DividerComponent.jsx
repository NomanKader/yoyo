import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../style/colors';

export default function DividerComponent({ style }) {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: theme.colors.dividerColor,
    width: '100%',    
  },
});
