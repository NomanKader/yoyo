import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import theme from '../../style/colors';
import RoundButtonComponent from '../Button/RoundButtonComponent';
import createIcon from '../../assets/icons/createIcon.png';

const SuccessScreenComponent = ({ route }) => {
  // Extract parameters from route.params
  const { header, subheader, nextScreen, nextScreenParams, navigation } = route.params;
  console.log('NextScreens',nextScreen);
  return (
    <View style={styles.container}>
      <Image source={createIcon} style={styles.icon} />
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.subHeader}>{subheader}</Text>
      <RoundButtonComponent label="Add Room" onPress={()=>navigation.navigate(nextScreen, nextScreenParams)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Adjust the background color as needed
    paddingHorizontal: 20,
  },
  icon: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.textDark,
    marginBottom: 10,
  },
  subHeader: {  
    width:270,
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.iconTextColor,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SuccessScreenComponent;
