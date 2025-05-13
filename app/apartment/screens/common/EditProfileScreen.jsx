import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderComponent from '../../components/Divider/HeaderComponent';

const ModalPicker = ({visible, onClose, data, onSelect}) => (
  <Modal transparent animationType="slide" visible={visible}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <FlatList
          data={data}
          keyExtractor={item => item.value}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                onSelect(item.value);
                onClose();
              }}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={onClose} style={styles.modalCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default function EditProfileScreen({navigation}) {
  const [profilePic, setProfilePic] = useState(require('../../assets/images/profileImage.png'));
  const [modalVisible, setModalVisible] = useState(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState('+66');
  const [selectedCountry, setSelectedCountry] = useState('Thailand');

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grantedCamera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        const grantedStorage = await PermissionsAndroid.request(
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return grantedCamera === PermissionsAndroid.RESULTS.GRANTED &&
               grantedStorage === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error('Permission error:', error);
        return false;
      }
    }
    return true;
  };

  const handlePhotoSelection = async (type) => {
    try {
      if (type === 'camera') {
        const image = await ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.8,
        });
        setProfilePic({ uri: image.path });
      } else if (type === 'gallery') {
        const image = await ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.8,
        });
        setProfilePic({ uri: image.path });
      }
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to select image');
        console.error(error);
      }
    } finally {
      setPhotoModalVisible(false);
    }
  };

  const photoOptions = [
    {label: 'Choose from Gallery', value: 'gallery'},
    {label: 'Take a Photo', value: 'camera'},
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container}>
          <HeaderComponent title={'Edit Profile'} navigation={navigation} onPress={() => navigation.goBack()} />        
          <View style={styles.profileSection}>
            <Image source={profilePic} style={styles.profileImage} />
            <TouchableOpacity style={styles.editIcon} onPress={() => setPhotoModalVisible(true)}>
              <Icon name="edit-2" size={14} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.name}>Allex Nail</Text>
            <Text style={styles.role}>Buyer</Text>
          </View>

          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value="Allex Nail" />

          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} value="allexnail@gmail.com" keyboardType="email-address" />

          <Text style={styles.label}>Phone</Text>
          <View style={styles.phoneRow}>
            <TouchableOpacity style={styles.selector} onPress={() => setModalVisible('code')}>
              <Text>{selectedCode}</Text>
            </TouchableOpacity>
            <TextInput style={styles.phoneInput} value="2615 6125 6125" keyboardType="phone-pad" />
          </View>

          <Text style={styles.label}>Country</Text>
          <TouchableOpacity style={styles.input} onPress={() => setModalVisible('country')}>
            <Text>{selectedCountry}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveText}>Save Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <ModalPicker
        visible={modalVisible === 'code'}
        onClose={() => setModalVisible(null)}
        data={[{label: '+66', value: '+66'}, {label: '+95', value: '+95'}]}
        onSelect={setSelectedCode}
      />
      <ModalPicker
        visible={modalVisible === 'country'}
        onClose={() => setModalVisible(null)}
        data={[{label: 'Thailand', value: 'Thailand'}, {label: 'Myanmar', value: 'Myanmar'}]}
        onSelect={setSelectedCountry}
      />
      <ModalPicker
        visible={photoModalVisible}
        onClose={() => setPhotoModalVisible(false)}
        data={photoOptions}
        onSelect={handlePhotoSelection}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' },
  profileSection: { alignItems: 'center', marginBottom: 25 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  editIcon: {
    position: 'absolute', bottom: 40, marginLeft: 60,
    backgroundColor: '#0047AB', width: 30, height: 30,
    borderRadius: 15, alignItems: 'center', justifyContent: 'center'
  },
  name: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  role: { fontSize: 13, color: '#777' },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 5, marginTop: 15 },
  input: {
    borderWidth: 1, borderColor: '#DDD', borderRadius: 8,
    padding: 10, backgroundColor: '#F9F9F9'
  },
  phoneRow: { flexDirection: 'row', gap: 10 },
  selector: {
    width: 70, borderWidth: 1, borderColor: '#DDD',
    borderRadius: 8, paddingHorizontal: 10, backgroundColor: '#F0F0F0',
    justifyContent: 'center', alignItems: 'center'
  },
  phoneInput: {
    flex: 1, borderWidth: 1, borderColor: '#DDD',
    borderRadius: 8, paddingHorizontal: 10, backgroundColor: '#F0F0F0'
  },
  saveBtn: {
    backgroundColor: '#0047AB', padding: 15, marginTop: 30,
    borderRadius: 8, alignItems: 'center'
  },
  saveText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalContent: {
    backgroundColor: '#FFF', padding: 20, borderTopLeftRadius: 10,
    borderTopRightRadius: 10, maxHeight: '50%'
  },
  modalItem: {
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EEE'
  },
  modalCancel: { marginTop: 15, alignItems: 'center' },
  cancelText: { color: '#FF0000', fontWeight: 'bold' },
});