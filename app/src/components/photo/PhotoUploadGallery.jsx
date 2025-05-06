import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

const PhotoUploadGallery = ({ photos, setPhotos }) => {
  const pickImages = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });
      const newImages = images.map(img => ({ uri: img.path }));
      setPhotos(prev => [...prev, ...newImages]);
    } catch (err) {
      console.log('Image picking cancelled');
    }
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const renderItem = ({ item, index }) => {
    if (item.type === 'upload') {
      return (
        <TouchableOpacity onPress={pickImages} style={styles.uploadBox}>
          <Icon name="image-outline" size={28} color="#888" />
          <Text style={styles.uploadText}>Upload Photos{'\n'}of Your Property</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.uri }} style={styles.image} />
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => removePhoto(index - 1)} 
        >
          <Icon name="close-circle" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

  const data = [{ type: 'upload' }, ...photos];

  return (
    <View>
      <Text style={styles.label}>Photos</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default PhotoUploadGallery;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  list: {
    flexDirection: 'row',
  },
  uploadBox: {
    width: 100,
    height: 100,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  uploadText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 4,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
});
