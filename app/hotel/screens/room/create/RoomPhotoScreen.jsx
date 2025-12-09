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
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../../../style/colors';
import { CommonStyles } from '../../../style/CommonStyles';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import BottomSheetComponent from '../../../components/BottomSheet/BottomSheetComponent';
import { useRoomData } from '../../../context/CreatCategoryContext';
import { CreateRoomCategory } from '../../../services/RoomService';
import TextInputComponent from '../../../components/TextInput/TextInputComponent';
import { ImageUpload, RemoveImage } from '../../../../common/service/ImageFileService';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const pickerOpts = { mediaType: 'photo', quality: 0.9, includeBase64: true };
const BASE_IMAGE_URL = 'http://www.12zay.com/easyclickup/upload/hotel/images/';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PADDING = 20;

const RoomPhotoScreen = ({ navigation }) => {
  const { roomData, updateRoomData } = useRoomData();

  const [images, setImages] = useState([]); // uploaded image names
  const [editingIndex, setEditingIndex] = useState(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const hasAny = images.length > 0;

  const openBottomSheet = (index) => {
    setEditingIndex(index);
    setIsBottomSheetVisible(true);
  };
  const closeBottomSheet = () => setIsBottomSheetVisible(false);

  const pickDone = async (response) => {
    if (!response?.assets?.length) return closeBottomSheet();

    const image = response.assets[0];

    if (image.fileSize && image.fileSize > MAX_FILE_SIZE) {
      Alert.alert('File too large', 'Please select a photo up to 5 MB.');
      return closeBottomSheet();
    }

    const fileName = image.fileName || image.uri?.split('/').pop();
    const fileType =
      image.type ||
      `image/${(fileName?.split('.').pop() || 'jpeg').toLowerCase()}`;

    const formData = new FormData();
    formData.append('myFile', {
      uri: image.uri || image.path,
      type: fileType,
      name: fileName,
    });
    formData.append('usage', 0);

    try {
      closeBottomSheet();
      setUploading(true);
      const uploadResponse = await ImageUpload(formData);

      if (uploadResponse?.success) {
        setImages((prev) => {
          const next = [...prev];
          if (editingIndex != null && editingIndex < next.length) {
            next[editingIndex] = uploadResponse.data?.name;
          } else {
            next.push(uploadResponse.data?.name);
          }
          return next;
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload failed', 'Something went wrong while uploading.');
    } finally {
      setUploading(false);
    }
  };

  const handleGallery = () => launchImageLibrary(pickerOpts, pickDone);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Allow camera to take photos.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  const handleCamera = async () => {
    const ok = await requestCameraPermission();
    if (ok) launchCamera(pickerOpts, pickDone);
  };

  const handleDelete = async(index) => {
    try {
      const response = await RemoveImage(images[index]);
      if (response?.success) {
        console.log('Image removed:', response);
        setImages((prev) => prev.filter((_, i) => i !== index));

      } else {
        console.warn('Failed to remove image:', response.message);
      }
    } catch (error) {
      console.error('Image delete error:', error);
    }

  }

  const handleSubmit = async () => {
    if (!hasAny) {
      return Alert.alert('Add a photo', 'Please upload at least one photo.');
    }

    const postBody = {
      roomTypeId: roomData?.roomTypeId,
      description: [
        {
          langaugeId: 1,
          description: roomData?.description,
          rules: roomData?.rules,
        },
      ],
      status: 1,
      pricePerNight: roomData?.pricePerNight,
      maxOccupancy: roomData?.maxOccupancy,
      roomSize: roomData?.roomSize,
      includesBreakfast: !!roomData?.includesBreakfast,
      isExtraBedAllowed: roomData?.isExtraBedAllowed,
      extraBedLimit: roomData?.extraBedLimit,
      roomCategoryPhotos: images,
      amenities: roomData?.amenities,
      facilities: roomData?.facilities,
      addOns: roomData?.addOns,
      roomBedType: [
        {
          bedTypeId: roomData.bedTypeId,
          isExtraBed: roomData.isExtraBed,
        },
      ],
    };

    try {
      setSubmitting(true);
      const response = await CreateRoomCategory({
        languageId: 1,
        hotelId: 1,
        body: postBody,
      });

      if (response.success) {
        navigation.replace('CategoryCreateSuccessScreen', {
          roomCategoryId: 1,
        });
      }
    } catch (error) {
      console.log('Create category error', error);
      Alert.alert('Error', 'Failed to create category. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.scrollViewContainer}>
      <StepAppBarComponent
        title="Add Photos"
        currentStep={8}
        navigation={navigation}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={CommonStyles.header}>Add Photos</Text>
        <Text style={CommonStyles.subHeader}>
          Please upload at least one photo for this category to be created.
        </Text>

        {/* Photos List */}
        <View style={{ gap: 14, marginTop: 10 }}>
          {images.map((image, idx) => (
            <View key={idx} style={styles.verticalCard}>
              <Image
                source={{ uri: `${BASE_IMAGE_URL}${image}` }}
                style={styles.verticalImage}
              />
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => openBottomSheet(idx)}
                  disabled={uploading || submitting}
                >
                  <Icon name="edit" size={18} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => handleDelete(idx)}
                  disabled={uploading || submitting}
                >
                  <Icon name="delete" size={18} color={theme.colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Add photo card */}
          <TouchableOpacity
            onPress={() => openBottomSheet(images.length)}
            style={styles.addVerticalCard}
            disabled={uploading || submitting}
          >
            {uploading ? (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            ) : (
              <>
                <Icon name="add" size={32} color={theme.colors.primary} />
                <Text style={styles.addTileText}>Add photo</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TextInputComponent
          placeholder="Max Occupancy"
          value={roomData.maxOccupancy}
          onChangeText={(v) =>
            updateRoomData({ maxOccupancy: parseInt(v, 10) })
          }
          label="Max Occupancy"
          keyboardType="numeric"
          editable={!uploading && !submitting}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <DefaultButtonComponent
          title={submitting ? 'Submitting...' : 'Continue'}
          backgroundColor={theme.colors.primary}
          disabled={!hasAny || uploading || submitting}
          onPress={handleSubmit}
        />
      </View>

      <BottomSheetComponent
        isVisible={isBottomSheetVisible}
        onClose={closeBottomSheet}
        title="Choose Option"
      >
        <TouchableOpacity
          style={styles.option}
          onPress={handleCamera}
          disabled={uploading || submitting}
        >
          <Icon name="photo-camera" size={20} color="#000" />
          <Text style={styles.optionText}>Camera</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.option}
          onPress={handleGallery}
          disabled={uploading || submitting}
        >
          <Icon name="photo-library" size={20} color="#000" />
          <Text style={styles.optionText}>Gallery</Text>
        </TouchableOpacity>
      </BottomSheetComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: H_PADDING,
    paddingBottom: 8,
    gap: 14,
  },
  verticalCard: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  verticalImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardActions: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    backgroundColor: '#fff',
    borderRadius: 999,
    padding: 6,
  },
  addVerticalCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  addTileText: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '600',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default RoomPhotoScreen;
