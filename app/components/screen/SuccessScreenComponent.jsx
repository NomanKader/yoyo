import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions  
} from 'react-native';
import theme from '../../style/colors';
import RoundButtonComponent from '../Button/RoundButtonComponent';
import successIllustration from '../../assets/images/successIllustration.png';
import DefaultButtonComponent from '../Button/DefaultButtonComponent';
import { useNavigation } from '@react-navigation/native';

// Get the screen width
const {width: screenWidth} = Dimensions.get('window');

const SuccessScreenComponent = ({route}) => {
  // Extract parameters from route.params
  const navigation=useNavigation();
  const {header, subheader, nextScreen, nextScreenParams, icon,isShowingIllustration, buttonText,color} = route.params;

  return (
    <View
      style={[
        styles.container,
        isShowingIllustration && {backgroundColor: theme.colors.info},
      ]}>
      <Image source={icon} style={styles.icon} />
      <Text
        style={[
          styles.header,
          isShowingIllustration && {color: theme.colors.textLight},
        ]}>
        {header}
      </Text>
      <Text
        style={[
          styles.subHeader,
          isShowingIllustration && {color: theme.colors.textLight},
        ]}>
        {subheader}
      </Text>

      {isShowingIllustration ? (       
        <>
          <Image
            source={successIllustration}
            style={styles.illustration}
            resizeMode="contain"
          />
        </>
      ) : (
        <RoundButtonComponent
          label="Add Room"
          onPress={() => navigation.navigate(nextScreen, nextScreenParams)}
        />
      )}

      {/* DefaultButtonComponent placed at the bottom */}
      {isShowingIllustration && (
          <View style={styles.buttonContainer}>
            <DefaultButtonComponent
              title={buttonText}
              backgroundColor={theme.colors.textLight}
              color={color}
              onPress={() =>buttonText=='Back to home'?navigation.navigate('TabScreen'):navigation.navigate(nextScreen,nextScreenParams)}
            />
          </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Default background color
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
    color: theme.colors.textDark, // Default color
    marginBottom: 10,
  },
  subHeader: {
    width: 270,
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.iconTextColor, // Default color
    textAlign: 'center',
    marginBottom: 20,
  },
  illustration: {
    width: screenWidth, // Full screen width
    height: 250, // Adjust height as needed
    position: 'absolute', // Position at the bottom
    bottom: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the bottom space as needed
    left: 0,
    right: 0,
    paddingHorizontal:20
        
  },
});

export default SuccessScreenComponent;
