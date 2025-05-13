import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BottomSheetComponent from './BottomSheetComponent';
import DividerComponent from '../Divider/DividerComponent';

export default function UploadBottomSheetComponent({ isVisible, onClose, title, onImageSelected }) {

  // Handle Camera
  const handleCamera = () => {
    launchCamera({ mediaType: 'photo', includeBase64: true }, response => {
      if (!response.didCancel && response.assets) {
        onImageSelected(response); // Pass the selected image to the parent
        onClose(); // Close bottom sheet
      }
    });
  };

  // Handle Gallery
  const handleGallery = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, response => {
      if (!response.didCancel && response.assets) {
        onImageSelected(response); // Pass the selected image to the parent
        onClose(); // Close bottom sheet
      }
    });
  };

  return (
    <BottomSheetComponent snapPoints={['50%', '40%']} isVisible={isVisible} onClose={onClose} title={title}>
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
  );
}

const styles = StyleSheet.create({
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
});
