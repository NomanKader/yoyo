import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import BackIcon from '../../apartment/assets/icons/backIcon.png';
import theme from '../../apartment/style/colors';


const CustomHeader = ({ title, onBack,contentContainerStyle }) => {
  return (
    <View style={[styles.headerRow,contentContainerStyle]}>
      <TouchableOpacity style={styles.backIconWrapper} onPress={onBack}>
        <Image source={BackIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backIconWrapper: {
    position: 'absolute',
    left: 0,
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
});
