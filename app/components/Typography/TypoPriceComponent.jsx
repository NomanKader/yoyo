import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../style/colors';

const TypoPriceComponent = ({ label, price }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoPrice}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  infoPrice: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '500',
  },
});

export default TypoPriceComponent;
