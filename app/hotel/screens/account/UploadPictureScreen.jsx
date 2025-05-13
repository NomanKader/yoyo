import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import DetailAppBarComponent from "../../components/AppBar/DetailAppBarComponent";
import { CommonStyles } from "../../style/CommonStyles";
import DividerComponent from "../../components/Divider/DividerComponent";
import BottomSheetComponent from "../../components/BottomSheet/BottomSheetComponent";
import plusIcon from '../../assets/icons/plusIcon.png'; // Ensure the path is correct
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import theme from "../../style/colors";
import paymentSuccessIcon from '../../assets/icons/paymentSuccessIcon.png';

export default function UploadPictureScreen({ navigation, route }) {
  const { photo1, photo2, photo3, photo4 } = route.params || {}; // Destructure photos from route params
  const initialImages = [photo1, photo2, photo3, photo4].map(photo => (photo ? { uri: photo } : null));
  
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [images, setImages] = useState(initialImages); // Initialize state with photos from route params

  // Function to show BottomSheetComponent and set selected index
  const openBottomSheet = (index) => {
    setSelectedIndex(index);
    setIsBottomSheetVisible(true);
  };

  // Function to hide BottomSheetComponent
  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  // Function to handle the camera option
  const handleCamera = () => {
    closeBottomSheet(); // Close the bottom sheet
    launchCamera({ mediaType: 'photo', includeBase64: true }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets[0].uri) {
        const newImages = [...images];
        newImages[selectedIndex] = { uri: response.assets[0].uri };
        setImages(newImages); // Update the images array
      }
    });
  };

  // Function to handle the gallery option
  const handleGallery = () => {
    closeBottomSheet(); // Close the bottom sheet
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets[0].uri) {
        const newImages = [...images];
        newImages[selectedIndex] = { uri: response.assets[0].uri };
        setImages(newImages); // Update the images array
      }
    });
  };

  return (
    <View style={CommonStyles.container}>
      {/* The ScrollView is wrapped in a View to allow flexibility */}
      <ScrollView style={styles.scrollViewContent}>
        <View style={CommonStyles.scrollViewContainer}>
          <DetailAppBarComponent title={"Upload Pictures"} navigation={navigation} />
          <DividerComponent />
          <Text style={CommonStyles.subHeader}>
            Please upload your hotel profile pictures, so that customers can see you better!
          </Text>
          {/* Grid Container */}
          <View style={styles.gridContainer}>
            {images.map((image, index) => (
              <TouchableOpacity key={index} style={styles.gridItem} onPress={() => openBottomSheet(index)}>
                {image ? (
                  <Image source={{ uri: image.uri }} style={styles.imageStyle} />
                ) : (
                  <Image source={plusIcon} style={styles.iconStyle} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* DefaultButtonComponent placed outside the ScrollView, pinned at the bottom */}
      <View style={styles.buttonContainer}>
        <DefaultButtonComponent 
          title={"Update"} 
          backgroundColor={theme.colors.primary} 
          onPress={() => {
            navigation.navigate('SuccessScreen', {
              header: 'Hotel is updated Successfully',
              subheader: '',
              nextScreen: 'TabStack', // Correct screen name
              // nextScreenParams: {screen: ''}, // Correct params for the nested navigator
              icon: paymentSuccessIcon,
              isShowingIllustration: true,
              buttonText: 'Back to home',
              color: theme.colors.primary                       
            });
          }}
        />
      </View>

      {/* BottomSheetComponent for Camera and Gallery options */}
      <BottomSheetComponent
        isVisible={isBottomSheetVisible}
        onClose={closeBottomSheet}
        title="Choose Options"
      >
        {/* Camera Option */}
        <TouchableOpacity style={styles.option} onPress={handleCamera}>
          <Icon name="photo-camera" size={20} color="#000" style={styles.optionIcon} />
          <Text style={styles.optionText}>Camera</Text>
        </TouchableOpacity>
        <DividerComponent />
        {/* Gallery Option */}
        <TouchableOpacity style={styles.option} onPress={handleGallery}>
          <Icon name="photo-library" size={20} color="#000" style={styles.optionIcon} />
          <Text style={styles.optionText}>Gallery</Text>
        </TouchableOpacity>
      </BottomSheetComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1, // Takes up the rest of the screen
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  gridItem: {
    width: '48%', // Half the width of the container minus some margin for spacing
    height: 150,
    backgroundColor: theme.colors.gridColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  iconStyle: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff', // Ensures it has a white background if the rest of the screen scrolls
  },
});
