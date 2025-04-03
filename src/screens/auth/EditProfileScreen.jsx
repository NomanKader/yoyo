import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import {GetProfile} from '../../api/DataController';

const DROPDOWN_FIELDS = [
  {
    label: 'Country',
    key: 'country',
    options: ['Indonesia', 'Thailand', 'Myanmar'],
  },
  {
    label: 'User Type',
    key: 'userType',
    options: ['Buyer', 'Seller'],
  },
];

const TEXT_FIELDS = [
  {label: 'Name', key: 'name'},
  {label: 'Email Address', key: 'email', keyboardType: 'email-address'},
];

export default function EditProfileScreen({navigation}) {
  const [profilePic, setProfilePic] = useState(
    require('../../assets/images/profileImage.png'),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    userType: '',
  });
  const [countryCode, setCountryCode] = useState('+66');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await GetProfile(2);
      const {name, email, phone, country, userType} = response.data;
      const {countryCode, phoneNumber} = splitPhoneNumber(phone);
      setCountryCode(countryCode);
      setFormData({name, email, phone: phoneNumber, country, userType});
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const splitPhoneNumber = phone => {
    const match = phone.match(/^(\+\d{1,3})\s*(.+)$/);
    return match
      ? {countryCode: match[1], phoneNumber: match[2].trim()}
      : {countryCode: '', phoneNumber: phone};
  };

  const handleChoosePhoto = type => {
    const options = {mediaType: 'photo', quality: 1};
    const callback = response => {
      if (response.assets?.length) {
        setProfilePic({uri: response.assets[0].uri});
        setModalVisible(false);
      }
    };
    (type === 'camera' ? launchCamera : launchImageLibrary)(options, callback);
  };

  const handleChange = (key, value) =>
    setFormData(prev => ({...prev, [key]: value}));

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header navigation={navigation} />
        <ProfileSection
          name={formData.name}
          role={formData.userType}
          profilePic={profilePic}
          onEdit={() => setModalVisible(true)}
        />

        <View style={styles.form}>
          {TEXT_FIELDS.map(({label, key, keyboardType}) => (
            <FormInput
              key={key}
              label={label}
              value={formData[key]}
              onChangeText={text => handleChange(key, text)}
              keyboardType={keyboardType}
            />
          ))}

          <Text style={styles.label}>Phone</Text>
          <View style={styles.phoneContainer}>
            <Text style={styles.countryCode}>{countryCode}</Text>
            <TextInput
              style={styles.phoneInput}
              value={formData.phone}
              onChangeText={text => handleChange('phone', text)}
              keyboardType="phone-pad"
            />
          </View>

          {DROPDOWN_FIELDS.map(({label, key, options}) => (
            <Dropdown
              key={key}
              label={label}
              value={formData[key]}
              onValueChange={value => handleChange(key, value)}
              options={options}
            />
          ))}

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>

        <PhotoPickerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={handleChoosePhoto}
        />
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      )}
    </View>
  );
}

// Sub-components
const Header = ({navigation}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" size={24} color="#000" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Edit Profile</Text>
    <View style={{width: 24}} />
  </View>
);

const ProfileSection = ({name, role, profilePic, onEdit}) => (
  <View style={styles.profileContainer}>
    <Image source={profilePic} style={styles.profileImage} />
    <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
      <Icon name="edit-2" size={14} color="#FFF" />
    </TouchableOpacity>
    <Text style={styles.profileName}>{name}</Text>
    <Text style={styles.profileRole}>{role}</Text>
  </View>
);

const FormInput = ({label, value, onChangeText, keyboardType = 'default'}) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </>
);

const Dropdown = ({label, value, onValueChange, options}) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.dropdown}>
      <Picker selectedValue={value} onValueChange={onValueChange}>
        {options.map(option => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </View>
  </>
);

const PhotoPickerModal = ({visible, onClose, onSelect}) => (
  <Modal animationType="slide" transparent visible={visible}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Choose an Option</Text>
        {[
          {label: 'Take a Photo', icon: 'camera', type: 'camera'},
          {label: 'Choose from Gallery', icon: 'image', type: 'gallery'},
        ].map(({label, icon, type}) => (
          <TouchableOpacity
            key={type}
            style={styles.modalButton}
            onPress={() => onSelect(type)}>
            <Icon name={icon} size={20} color="#FFF" />
            <Text style={styles.modalButtonText}>{label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.modalCancel} onPress={onClose}>
          <Text style={styles.modalCancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    bottom: 50,
    right: 135,
    backgroundColor: '#007BFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileRole: {
    fontSize: 14,
    color: '#777',
  },
  form: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
  },
  dropdown: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#0047AB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
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
    elevation: 5,
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
    padding: 12,
    backgroundColor: '#007BFF',
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 16,
  },
});
