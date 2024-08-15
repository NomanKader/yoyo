import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableNativeFeedback } from 'react-native';
import theme from '../../style/colors';
import RoundButtonComponent from '../Button/RoundButtonComponent';
import createIcon from '../../assets/icons/createIcon.png';
import paymentSuccessIcon from "../../assets/icons/paymentSuccessIcon.png";
import paymentIllustration from "../../assets/images/paymentIllustration.png";
import confirmpaymentIllustration from "../../assets/images/confirmpaymentillustration.png";
import { TouchableOpacity } from 'react-native-gesture-handler';

// Get the screen width
const { width: screenWidth } = Dimensions.get('window');

const SuccessScreenComponent = ({ route, navigation }) => {  
  // Extract parameters from route.params
  const { header, subheader, nextScreen, nextScreenParams } = route.params;

  // Check if the header includes the word "Payment"
  const isPaymentRelated = header.includes('Payment') || header.includes('Reservation');

  return (
    <View style={[styles.container, isPaymentRelated && { backgroundColor: theme.colors.info }]}>
      <Image 
        source={isPaymentRelated ? paymentSuccessIcon : createIcon} 
        style={styles.icon} 
      />
      <Text style={[styles.header, isPaymentRelated && { color: theme.colors.textLight }]}>
        {header}
      </Text>
      <Text style={[styles.subHeader, isPaymentRelated && { color: theme.colors.textLight }]}>
        {subheader}
      </Text>

      {(isPaymentRelated && header.includes('Payment')) && (
        <TouchableNativeFeedback onPress={()=>navigation.navigate("AppStack",{screen:"CheckInStatusScreen"})}>
        <Image 
          source={paymentIllustration} 
          style={styles.illustration} 
          resizeMode="contain" 
        />
        </TouchableNativeFeedback>
      )}
      {(isPaymentRelated && header.includes('Reservation')) && (
        <TouchableNativeFeedback onPress={()=>navigation.navigate("AppStack",{screen:"PaymentScreen"})}>
        <Image 
          source={confirmpaymentIllustration} 
          style={styles.illustration} 
          resizeMode="contain" 
        />
        </TouchableNativeFeedback>
      )}
      {!isPaymentRelated && (
        <RoundButtonComponent 
          label="Add Room" 
          onPress={() => navigation.navigate(nextScreen, nextScreenParams)} 
        />
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
});

export default SuccessScreenComponent;
