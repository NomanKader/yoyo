import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect} from 'react';
import {CommonStyles} from '../style/CommonStyles';
import theme from '../style/colors';
import heroImg from '../assets/images/hero1.png';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';

const {width, height} = Dimensions.get('window');

export default function WelcomeScreen({navigation}) {
  // useEffect(() => {
  //     const checkAccessToken = async () => {
  //       try {
  //        const isValid=await AccessTokenService._TokenValidation();
  //        console.log("isValud",isValid);
  //        if(isValid){
  //         setIsAuthenticated(true)
  //        }
  //        else{
  //         Alert.alert("","Session Expired");
  //         // navigation.navigate('unauthorized');
  //        }
  //       } catch (error) {
  //         console.log("Keychain couldn't be accessed!", error);
  //         navigation.navigate('Login');
  //       }
  //     };

  //     // checkAccessToken();
  //     // _BackHandlerService();
  //   }, [navigation]);

  return (
    <SafeAreaView style={styles.flexContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={CommonStyles.container}>
        <Image
          source={heroImg}
          resizeMode="cover"
          style={styles.heroImage}
          alt="Hotel hero image"
        />
        <View style={CommonStyles.scrollViewContainer}>
          <View style={styles.centeredContainer}>
            <Text style={styles.headerText}>
              Find your best {'\n'}
              comfortable hotel.
            </Text>
            <Text style={styles.subHeaderText}>
              Express Your Creativity With Using Our {'\n'} App, Using Our
              Primitive
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <DefaultButtonComponent
              title="Access Marketplace"
              backgroundColor={theme.colors.primary}
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}
              color={theme.colors.textLight}
              otherStyle={styles.buttonStyle}
              otherTextStyle={styles.buttonTextStyle}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  heroImage: {
    width: width * 1,
    height: height * 0.55,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginTop: 30,
    textAlign: 'center',
  },
  subHeaderText: {
    ...CommonStyles.text,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 25,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  buttonStyle: {
    width: width * 0.9,
    height: height * 0.08,
    borderRadius: 37,
  },
  buttonTextStyle: {
    fontSize: 14,
  },
});
