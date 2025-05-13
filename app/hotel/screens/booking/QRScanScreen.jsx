import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { launchImageLibrary } from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


export default function QRScanScreen({ navigation }) {
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState('off');

useEffect(() => {
  const requestPermissions = async () => {
    const cameraStatus = await Camera.requestCameraPermission(); // 'authorized' | 'denied'
    const micStatus = await Camera.requestMicrophonePermission();

    console.log('📷 Camera permission:', cameraStatus);
    console.log('🎙️ Mic permission:', micStatus);

    if (cameraStatus === 'granted' && micStatus === 'granted') {
      setHasPermission(true);
    } else {
      setHasPermission(false);
      Alert.alert(
        'Permissions Required',
        `Camera: ${cameraStatus}\nMic: ${micStatus}\n\nPlease enable from Android Settings.`
      );
    }
  };

  requestPermissions();
}, []);
  

  const handleQRCodeScanned = (qrCodes) => {
    if (qrCodes?.[0]?.value) {
      Alert.alert('QR Code', qrCodes[0].value);
    }
  };

  const toggleFlash = () => {
    setFlash((prev) => (prev === 'off' ? 'on' : 'off'));
  };

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
      RNQRGenerator.detect({ uri: selectedImage })
        .then(({ values }) => {
          if (values.length > 0) {
            Alert.alert('QR Code from Gallery', values[0]);
          } else {
            Alert.alert('No QR Code found');
          }
        })
        .catch((err) => {
          console.error('Image QR Scan Error', err);
          Alert.alert('Error scanning image');
        });
    }
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: '#fff' }}>Requesting camera permission...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon name="close" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Vision Camera */}
      {isFocused && (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          torch={flash}
          zoom={zoom}
          onFrameProcessorFps={5}
          frameProcessor={undefined} // Replace with custom QR processor if needed
        />
      )}

      {/* Flash Toggle */}
      <TouchableOpacity style={styles.flashToggle} onPress={toggleFlash}>
        <View style={styles.flashIconContainer}>
          <Icon name={flash === 'off' ? 'flash-off' : 'flash'} size={30} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Zoom Slider */}
      <View style={styles.sliderContainer}>
        <Text style={{ color: '#fff' }}>-</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={zoom}
          onValueChange={setZoom}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1fb28a"
        />
        <Text style={{ color: '#fff' }}>+</Text>
      </View>

      {/* Gallery Image Picker */}
      <TouchableOpacity style={styles.galleryToggle} onPress={handleImagePicker}>
        <View style={styles.galleryIconContainer}>
          <Icon name="images-outline" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  closeButton: {
    position: 'absolute', top: 60, left: 20, zIndex: 10, padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 30,
  },
  flashToggle: {
    position: 'absolute', top: 50, right: 20, padding: 10, backgroundColor: 'transparent',
  },
  flashIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 30, padding: 10,
  },
  sliderContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 16, position: 'absolute', bottom: 20, width: '100%',
  },
  slider: { width: '80%', height: 40 },
  galleryToggle: {
    position: 'absolute', bottom: 100, right: 20, padding: 10, backgroundColor: 'transparent',
  },
  galleryIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 30, padding: 10,
  },
});
