import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import authIllustrationImage from '../../assets/images/authIllustration.png';
import BGCardComponent from '../../components/Card/BGCardComponent';
import SigninOrRegisterCardComponent from '../../components/Card/SginOrRegisterCardComponent';
import theme from '../../styles/colors';

const screenHeight = Dimensions.get('window').height;

export default function AuthScreen({navigation}) {
  return (
    <View style={styles.container}>
      {/* Illustration Container */}
      <View style={styles.illustrationContainer}>
        <Image
          source={authIllustrationImage}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Positioned View to hold BGCardComponent */}
      <View style={styles.cardWrapper}>
        <BGCardComponent padding={30}>
          <TouchableOpacity
            style={styles.authButtonPrimary}
            onPress={() => navigation.navigate('login')}>
            <Icon name="phone-android" size={20} color="white" />
            <Text style={styles.authButtonTextPrimary}>
              Continue with Mobile Number
            </Text>
          </TouchableOpacity>

          <SigninOrRegisterCardComponent
            iconName={'google'}
            title={'Continue With Google'}
            iconColor={theme.colors.googleIconColor}
            containerStyle={{marginBottom: 10}}
          />
          <SigninOrRegisterCardComponent
            iconName={'facebook'}
            title={'Continue With Facebook'}
            iconColor={theme.colors.facebookIconColor}
            containerStyle={{marginBottom: 10}}
          />

          {/* Register Link */}
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('register')}>
              Register
            </Text>
          </Text>
        </BGCardComponent>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  illustrationContainer: {
    flex: 1, // Takes the top 50% of the screen
    alignItems: 'center',
  },
  illustration: {
    width: '70%',
    height: '70%',
  },
  cardWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: screenHeight * 0.45, // Show it from 50% height
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  authButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  authButtonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  authButtonText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  registerText: {
    marginTop: 10,
    fontSize: 14,
    color: '#777',
    alignSelf: 'center',
  },
  registerLink: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
