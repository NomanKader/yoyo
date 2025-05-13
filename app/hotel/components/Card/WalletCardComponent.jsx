import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const WalletCardComponent = ({
  label,
  amount,
  icon,
  backgroundColor,
  onPress,
}) => {
  return (
    <View style={[styles.card, {backgroundColor}]}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
      <TouchableWithoutFeedback onPress={onPress}>
        <Image source={icon} style={styles.icon} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  amount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  icon: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
  },
});

export default WalletCardComponent;
