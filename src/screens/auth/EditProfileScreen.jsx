import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ProfileImage from '../../assets/images/profileImage.png';
import theme from '../../styles/colors';
 
export default function EditProfileScreen({ navigation }) {
  const [profilePic, setProfilePic] = useState(ProfileImage);
  const [modalVisible, setModalVisible] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
 
  // Function to handle Image Selection
  const handleChoosePhoto = (type) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true, // Converts image to base64
    };
 
    const callback = (response) => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.errorMessage) {
        console.log('Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfilePic({ uri: response.assets[0].uri });
        setBase64Image(response.assets[0].base64); // Store base64 data
        setModalVisible(false);
      }
    };
 
    if (type === 'camera') {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  };
 
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
 
      {/* Header */}
      <Text style={styles.headerText}>Edit Profile</Text>
 
      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image source={profilePic} style={styles.profileImage} />
        <TouchableOpacity style={styles.editIcon} onPress={() => setModalVisible(true)}>
          <Icon name="camera" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
 
      {/* Personal Details */}
      <Text style={styles.sectionTitle}>Personal Details</Text>
 
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} value="Aung" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} value="Aung" />
        </View>
      </View>
 
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} value="1234567890" />
      </View>
 
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput style={styles.input} value="aung@gmail.com" />
      </View>
 
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} value="Panbedan, Maharbandula" />
      </View>
 
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setEditing(false)}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={() => setEditing(false)}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
 
      {/* Image Picker Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Option</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleChoosePhoto('camera')}>
              <Icon name="camera" size={20} color="#FFF" />
              <Text style={styles.modalButtonText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleChoosePhoto('gallery')}>
              <Icon name="image" size={20} color="#FFF" />
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.colors.primary,
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '48%',
  },
  inputContainerFull: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  cancelText: {
    fontSize: 16,
  },
  saveText: {
    fontSize: 16,
    color: '#FFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  modalCancel: {
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#FF0000',
  },
});