import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../../../style/colors';
import { CommonStyles } from '../../../style/CommonStyles';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import BottomSheetComponent from '../../../components/BottomSheet/BottomSheetComponent';
import createIcon from '../../../assets/icons/createIcon.png';
import DividerComponent from '../../../../apartment/components/Divider/DividerComponent';

const chipLabels = ['Property', 'Dining Area', 'Gym'];

const RoomPhotoScreen = ({ navigation }) => {
  const [selectedChip, setSelectedChip] = useState('Property');
  const [imageGroups, setImageGroups] = useState({
    Property: [],
    'Dining Area': [],
    Gym: [],
  });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const currentImages = imageGroups[selectedChip];

  const openBottomSheet = (index) => {
    setSelectedIndex(index);
    setIsBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleImagePick = (response) => {
    if (response.assets && response.assets[0].uri) {
      const updated = [...imageGroups[selectedChip]];
      if (selectedIndex !== null && selectedIndex < updated.length) {
        updated[selectedIndex] = { uri: response.assets[0].uri };
      } else {
        updated.push({ uri: response.assets[0].uri });
      }
      setImageGroups({ ...imageGroups, [selectedChip]: updated });
    }
    closeBottomSheet();
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera access to take pictures.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    launchCamera({ mediaType: 'photo', includeBase64: false }, handleImagePick);
  };

  const handleGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, handleImagePick);
  };

  const handleDeleteImage = (index) => {
    const updated = [...imageGroups[selectedChip]];
    updated.splice(index, 1);
    setImageGroups({ ...imageGroups, [selectedChip]: updated });
  };

  return (
    <SafeAreaView style={CommonStyles.scrollViewContainer}>      
      <StepAppBarComponent
        title="Add Photos"
        currentStep={8}
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={CommonStyles.header}>Add Photos</Text>
        <Text style={CommonStyles.subHeader}>
          Please upload at least one photo for this category to be created.
        </Text>

        {/* Chips */}
        <View style={styles.chipContainer}>
          {chipLabels.map((label) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.chip,
                selectedChip === label && styles.chipSelected,
              ]}
              onPress={() => setSelectedChip(label)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedChip === label && styles.chipTextSelected,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Image Preview Grid */}
        <View style={styles.imageGrid}>
          {currentImages.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => handleDeleteImage(index)}                
              >
                <Icon name="delete" size={20} color={theme.colors.error} />
              </TouchableOpacity>
            </View>
          ))}

          {/* Add Image Block */}
          <TouchableOpacity
            style={styles.addBlock}
            onPress={() => openBottomSheet(currentImages.length)}
          >
            <Icon name="add" size={32} color={theme.colors.primary} />
            <Text style={styles.addText}>Add Image</Text>
            <Text style={styles.sizeText}>( Max. size 5 MB )</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <DefaultButtonComponent
          title="Continue"
          backgroundColor={theme.colors.primary}
          onPress={() =>
            navigation.navigate('SuccessScreen', {
              header: 'Category Created',
              nextScreen: 'AppStack',
              nextScreenParams: { screen: 'RoomCategoryCreateScreen' },
              navigation,
              icon: createIcon,
            })
          }
        />
      </View>

      {/* Bottom Sheet */}
      <BottomSheetComponent
        isVisible={isBottomSheetVisible}
        onClose={closeBottomSheet}
        title="Choose Option"
      >
        <TouchableOpacity style={styles.option} onPress={handleCamera}>
          <Icon name="photo-camera" size={20} color="#000" />
          <Text style={styles.optionText}>Camera</Text>
        </TouchableOpacity>
        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 5 }} />
        <TouchableOpacity style={styles.option} onPress={handleGallery}>
          <Icon name="photo-library" size={20} color="#000" />
          <Text style={styles.optionText}>Gallery</Text>
        </TouchableOpacity>
      </BottomSheetComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
  },
  chipText: {
    color: '#000',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  imageGrid: {
    gap: 15,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    elevation:3
  },
  addBlock: {
    height: 180,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 5,
  },
  addText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
  },
  sizeText: {
    fontSize: 12,
    color: 'gray',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default RoomPhotoScreen;
