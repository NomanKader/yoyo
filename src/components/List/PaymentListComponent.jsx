import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import theme from '../../styles/colors';

const PaymentListComponent = ({icon, title, description, onPress}) => {
  return (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <View style={styles.option}>
        {icon && <Image source={{uri: icon}} style={styles.icon} />}

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentListComponent;

const styles = StyleSheet.create({
  optionContainer: {
    marginBottom: 0,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gridColor, // Placeholder for icon background
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: theme.colors.textLightBrown,
    fontFamily: theme.customfonts.medium,
  },
  description: {
    fontSize: 14,
    color: theme.colors.infoText,
  },
  arrow: {
    marginRight: 15,
    fontSize: 30,
    color: theme.colors.textDark,
  },
});
