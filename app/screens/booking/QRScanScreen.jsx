import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Slider from '@react-native-community/slider';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator'; // Import the library for QR scanning from images

export default function QRScanScreen() {
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);

  const onSuccess = (event) => {
    Alert.alert('QR Code Data', event.data);
  };

  const toggleFlash = () => {
    setFlash(
      flash === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.torch
        : RNCamera.Constants.FlashMode.off
    );
  };

  // Updated handleImagePicker function with rn-qr-generator
  const handleImagePicker = async () => {
    const options = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri; // Get the URI of the selected image

      // Use RNQRGenerator to extract QR code from the selected image
      RNQRGenerator.detect({
        uri: selectedImage, // Pass the selected image URI
      })
        .then((response) => {
          const { values } = response;
          if (values.length > 0) {
            Alert.alert('QR Code Data from Gallery', values[0]); // Show detected QR code
          } else {
            Alert.alert('No QR code found', 'Please select a valid image containing a QR code.');
          }
        })
        .catch((error) => {
          console.error('Cannot detect QR code in image', error);
          Alert.alert('Error', 'Failed to scan QR code from the image.');
        });
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={true}
        reactivateTimeout={500}
        showMarker={true}
        customMarker={
          <View style={styles.customMarker}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        }
        cameraStyle={styles.cameraContainer}
        cameraProps={{
          zoom: zoom,
          flashMode: flash,
        }}
      />

      {/* Flash toggle icon with circular background */}
      <TouchableOpacity style={styles.flashToggle} onPress={toggleFlash}>
        <View style={styles.flashIconContainer}>
          <Icon
            name={flash === RNCamera.Constants.FlashMode.off ? 'flash-off' : 'flash'}
            size={30}
            color="#fff"
          />
        </View>
      </TouchableOpacity>

      {/* Slider for zoom control */}
      <View style={styles.sliderContainer}>
        <Text style={{ color: '#fff' }}>-</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={zoom}
          onValueChange={(value) => setZoom(value)}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1fb28a"
        />
        <Text style={{ color: '#fff' }}>+</Text>
      </View>

      {/* Upload from Gallery Icon */}
      <TouchableOpacity style={styles.galleryToggle} onPress={handleImagePicker}>
        <View style={styles.galleryIconContainer}>
          <Icon name="images-outline" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -40,
    backgroundColor: '#000',
  },
  customMarker: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#2a79ff',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  cameraContainer: {
    height: '90%',
    width: '100%',
  },
  flashToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: 'transparent',
  },
  flashIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 30,
    padding: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  slider: {
    width: '80%',
    height: 40,
  },
  galleryToggle: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    padding: 10,
    backgroundColor: 'transparent',
  },
  galleryIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 30,
    padding: 10,
  },
});
