import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import theme from '../../style/colors';

const WalletCardComponent = ({
  label,
  amount,
  icon,
  IconText,
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
        {icon && <Image source={icon} style={styles.icon} />}
        {IconText && <Text style={styles.IconText}>{IconText}</Text>}
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
    marginTop: 10,
  },
  icon: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
  },
  IconText: {
    fontSize: 12,
    color: theme.colors.textLight,
    backgroundColor: theme.colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: theme.colors.textLight,
  },
});

export default WalletCardComponent;
