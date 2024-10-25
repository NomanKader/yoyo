import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import DividerComponent from '../Divider/DividerComponent';

const AccountSettingListComponent = ({ icon, header, subheader, onPress, rightArrowIcon }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftIconContainer}>
        <Image source={icon} style={styles.leftIcon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{header}</Text>
        {subheader && <Text style={styles.subheader}>{subheader}</Text>}
      </View>
      {rightArrowIcon && (
        <View style={styles.rightIconContainer}>
          <Image source={rightArrowIcon} style={styles.rightIcon} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  leftIconContainer: {
    marginRight: 15,
  },
  leftIcon: {
    width: 30,
    height: 30,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subheader: {
    fontSize: 14,
    color: '#666',
  },
  rightIconContainer: {
    marginLeft: 'auto',
  },
  rightIcon: {
    width: 20,
    height: 20,
  },
});

export default AccountSettingListComponent;
