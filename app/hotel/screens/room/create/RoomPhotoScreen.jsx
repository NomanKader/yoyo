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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const pickerOpts = { mediaType: 'photo', quality: 0.9, includeBase64: true };

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PADDING = 20;
const GRID_GAP = 10;
const COLS = 3;
const THUMB_SIZE = Math.floor(
  (SCREEN_WIDTH - H_PADDING * 2 - GRID_GAP * (COLS - 1)) / COLS
);

const RoomPhotoScreen = ({ navigation }) => {
  const { roomData, updateRoomData } = useRoomData();

  const [images, setImages] = useState([]); // [{ uri, base64, fileName, type, fileSize }]
  const [editingIndex, setEditingIndex] = useState(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const hasAny = images.length > 0;

  const openBottomSheet = (index) => {
    setEditingIndex(index); // if index is existing item => replace, else add new
    setIsBottomSheetVisible(true);
  };
  const closeBottomSheet = () => setIsBottomSheetVisible(false);

  const pickDone = (response) => {
    if (!response?.assets?.length) {
      closeBottomSheet();
      return;
    }
    const a = response.assets[0];

    if (a.fileSize && a.fileSize > MAX_FILE_SIZE) {
      Alert.alert('File too large', 'Please select a photo up to 5 MB.');
      closeBottomSheet();
      return;
    }

    const item = {
      uri: a.uri,
      base64: a.base64 || '',
      fileName: a.fileName || `photo_${Date.now()}.jpg`,
      type: a.type || 'image/jpeg',
      fileSize: a.fileSize,
    };

    setImages((prev) => {
      const next = [...prev];
      if (editingIndex != null && editingIndex < next.length) {
        next[editingIndex] = item; // replace existing
      } else {
        next.push(item); // add new
      }
      return next;
    });

    closeBottomSheet();
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
    if (!ok) return;
    launchCamera(pickerOpts, pickDone);
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!hasAny) {
      Alert.alert('Add a photo', 'Please upload at least one photo.');
      return;
    }

    const roomCategoryPhotos = images
      .filter((i) => !!i.base64)
      .map((i) => i.base64);

    if (roomCategoryPhotos.length === 0) {
      Alert.alert('No image data', 'Selected images have no base64 content.');
      return;
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
      roomCategoryPhotos, // string[]
      amenities: roomData?.amenities,
      facilities: roomData?.facilities,
      roomBedType: [
        {
          bedTypeId: roomData.bedTypeId,
          isExtraBed: roomData.isExtraBed
        }
      ]
    };
    console.log("body", JSON.stringify(postBody))

    try {
      const response = await CreateRoomCategory({
        languageId: 1,
        hotelId: 1,
        body: postBody,
      });
      console.log('Create category response', response);
      // navigation.navigate('SuccessScreen', {...});
    } catch (error) {
      console.log('Create category error', error);
      Alert.alert('Error', 'Failed to create category. Please try again.');
    }
  };

  return (
    <SafeAreaView style={CommonStyles.scrollViewContainer}>
      <StepAppBarComponent title="Add Photos" currentStep={8} navigation={navigation} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={CommonStyles.header}>Add Photos</Text>
        <Text style={CommonStyles.subHeader}>
          Please upload at least one photo for this category to be created.
        </Text>

        {/* Empty state */}
        {!hasAny && (
          <TouchableOpacity
            onPress={() => openBottomSheet(images.length)}
            style={[styles.emptyTile, { height: THUMB_SIZE * 1.6 }]}
          >
            <Icon name="add" size={32} />
            <Text style={styles.addTileText}>Add photos</Text>
          </TouchableOpacity>
        )}

        {/* Grid of ALL photos (equal size) */}
        {hasAny && (
          <>
            <Text style={styles.gridTitle}>Uploaded Photos ({images.length})</Text>
            <View style={styles.grid}>
              {images.map((img, idx) => (
                <View
                  key={`${img.uri}-${idx}`}
                  style={[styles.thumb, { width: THUMB_SIZE, height: THUMB_SIZE }]}
                >
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => openBottomSheet(idx)}
                    style={StyleSheet.absoluteFill}
                  >
                    <Image source={{ uri: img.uri }} style={styles.thumbImage} />
                  </TouchableOpacity>

                  <View style={styles.thumbActions}>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => openBottomSheet(idx)}
                    >
                      <Icon name="edit" size={16} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => handleDelete(idx)}
                    >
                      <Icon name="delete" size={16} color={theme.colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Add tile at the end */}
              <TouchableOpacity
                onPress={() => openBottomSheet(images.length)}
                style={[styles.thumbAdd, { width: THUMB_SIZE, height: THUMB_SIZE }]}
              >
                <Icon name="add" size={28} color="#111827" />
                <Text style={styles.addTileText}>Add</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Optional: keep the original add button too */}
        <TouchableOpacity
          style={styles.addMoreBtn}
          onPress={() => openBottomSheet(images.length)}
        >
          <Text style={styles.addMoreText}>+ Add more photo</Text>
        </TouchableOpacity>
        <TextInputComponent
          placeholder="Max Occupancy"
          value={roomData.maxOccupancy}
          onChangeText={(v) => updateRoomData({ maxOccupancy: parseInt(v) })}
          label="Price of Room"
          keyboardType="numeric"
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <DefaultButtonComponent
          title="Continue"
          backgroundColor={theme.colors.primary}
          disabled={!hasAny}
          onPress={() => {
            // handleSubmit()
            navigation.replace('CategoryCreateSuccessScreen', {
              roomCategoryId: 1, // adjust to your API
            });

            console.log("roomData", roomData)
          }}
        />
      </View>

      <BottomSheetComponent
        isVisible={isBottomSheetVisible}
        onClose={closeBottomSheet}
        title="Choose Option"
      >
        <TouchableOpacity style={styles.option} onPress={handleCamera}>
          <Icon name="photo-camera" size={20} color="#000" />
          <Text style={styles.optionText}>Camera</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
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
    padding: H_PADDING,
    paddingBottom: 8,
    gap: 14,
  },

  // Empty state
  emptyTile: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  gridTitle: {
    marginTop: 6,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: GRID_GAP,
    rowGap: GRID_GAP,
  },
  thumb: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  thumbActions: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    gap: 6,
  },
  iconBtn: {
    backgroundColor: '#fff',
    borderRadius: 999,
    padding: 6,
  },
  thumbAdd: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF',
  },
  addTileText: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '600',
  },

  addMoreBtn: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 12,
  },
  addMoreText: {
    color: '#fff',
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
