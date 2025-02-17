import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';
import theme from '../style/colors';
import yoyoLogo from '../assets/icons/yoyologo.png';
import apartmentImage from '../assets/images/apartment.png';

const ChooseScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={yoyoLogo} style={styles.logo} />
        </View>

        <View style={styles.buttonContainer}>
          <DefaultButtonComponent 
            title="Hotel" 
            backgroundColor={theme.colors.primary} 
            otherStyle={styles.button} 
            onPress={() => navigation.navigate('WelcomeScreen')} 
          />
          <DefaultButtonComponent 
            title="Apartment" 
            backgroundColor={theme.colors.primary} 
            otherStyle={styles.button} 
            onPress={() => navigation.navigate("ApartmentTabStack")}
            />
        </View>
      </View>

      <View style={{ flex: 1}}>
        <Image source={apartmentImage} style={styles.apartmentImage} resizeMode="stretch" />
      </View>
    </SafeAreaView>
  );
};

export default ChooseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 2, // Ensures content takes up space above the image
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: 330,
    height: 62,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  apartmentImage: {
    width: '100%',
    height: "100%", 
    alignSelf: 'stretch',
  },
});
