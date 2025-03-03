import React, {useState} from 'react';
import {Modal, View, StyleSheet, Image, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {BlurView} from '@react-native-community/blur';
import theme from '../../styles/colors';

const ScreenLoading = ({isLoad, loadingText = 'Loading'}) => {
  return (
    <View style={styles.centerView}>
      <BlurView
        style={styles.blurBackground}
        blurType="light"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.loadingBox}>
        <LottieView
          autoPlay
          loop={true}
          source={require('../../assets/animations/loadingAnimation.json')}
          style={{width: 165, height: 120}}
        />
        <Text style={styles.loadingText}>{loadingText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject, // Fills the entire screen
  },
  loadingBox: {
    width: 190,
    height: 155,
    backgroundColor: theme.colors.white,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
    shadowColor: theme.colors.textDark,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 3,
    borderColor: theme.colors.light,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.textLightBrown,
    fontFamily: theme.customfonts.medium,
    marginBottom: 15,
    marginTop: -25,
  },
});

export default ScreenLoading;

{
  /* <Modal
        animationType="fade"
        transparent={true}
        visible={isLoad}
        statusBarTranslucent={true}>
        <View style={styles.centerView}>
          <View style={styles.loadingBox}>
            <LottieView
              autoPlay
              loop={true}
              source={require('../assets/loadingJson.json')}
              style={{ width: 200, height: 80 }}
            />
            <Text style={styles.loadingText}>{loadingText}</Text>
          </View>
        </View>
      </Modal> */
}
