import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderComponent from '../../../apartment/components/Divider/HeaderComponent';
import closeIcon from '../../assets/icons/closeIcon.png';
import plusIcon from '../../assets/icons/plusIcon.png';
import theme from '../../style/colors';

const BasicHotelDetailScreen = ({ navigation }) => {
  const [logo, setLogo] = useState(null);
  const [hotelName, setHotelName] = useState('A Hotels');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('ahotel@gmail.com');
  const [phoneNumbers, setPhoneNumbers] = useState([
    { id: 1, code: '+95', number: '9089467010' },
    { id: 2, code: '+95', number: '0778967432' },
  ]);
  const [newPhone, setNewPhone] = useState({ code: '+95', number: '' });
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [selectedPhoneIndex, setSelectedPhoneIndex] = useState(null);
  const [documentImage, setDocumentImage] = useState(null);
  const [showAlertBox, setShowAlertBox] = useState(true);

  const handleChooseLogo = async () => {
    const image = await ImagePicker.openPicker({
      mediaType: 'photo',
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 800,
      compressImageQuality: 0.8,
    });
    setLogo({ uri: image.path });
  };

  const handleChooseDocumentImage = async () => {
    const file = await ImagePicker.openPicker({
      mediaType: 'photo',
      compressImageQuality: 0.8,
    });
    setDocumentImage({ uri: file.path });
  };

  const handleAddPhoneNumber = () => {
    if (newPhone.number.trim() !== '') {
      setPhoneNumbers([...phoneNumbers, { ...newPhone, id: Date.now() }]);
      setNewPhone({ code: '+95', number: '' });
    }
  };

  const handleRemovePhoneNumber = (id) => {
    setPhoneNumbers(phoneNumbers.filter((p) => p.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderComponent title="Basic Hotel Details" onPress={() => navigation.goBack()} />

      {showAlertBox && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>Please upload the official hotel documents below!</Text>
          <TouchableOpacity onPress={() => setShowAlertBox(false)}>
            <Image source={closeIcon} style={styles.close} />
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.label}>Hotel Logo</Text>
      <TouchableOpacity style={styles.uploadBox} onPress={handleChooseLogo}>
        {logo ? (
          <Image source={logo} style={styles.image} />
        ) : (
          <>
            <Image source={plusIcon} style={styles.icon} />
            <Text style={styles.uploadPlaceholder}>Change Image</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Name of Hotel</Text>
      <TextInput style={styles.input} value={hotelName} onChangeText={setHotelName} />

      <Text style={styles.label}>Hotel Description (Optional)</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Enter description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Hotel Email Address</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Phone Number</Text>
      {phoneNumbers.map((phone, index) => (
        <View key={phone.id} style={styles.row}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setSelectedPhoneIndex(index);
              setPhoneModalVisible(true);
            }}>
            <Text>{phone.code}</Text>
            <Icon name="chevron-down" size={16} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={phone.number}
            onChangeText={(text) => {
              const updated = [...phoneNumbers];
              updated[index].number = text;
              setPhoneNumbers(updated);
            }}
            keyboardType="phone-pad"
          />
          {index > 0 && (
            <TouchableOpacity onPress={() => handleRemovePhoneNumber(phone.id)}>
              <Text style={{ color: 'red' }}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* New Phone Row */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setSelectedPhoneIndex(-1);
            setPhoneModalVisible(true);
          }}>
          <Text>{newPhone.code}</Text>
          <Icon name="chevron-down" size={16} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={newPhone.number}
          onChangeText={(text) => setNewPhone({ ...newPhone, number: text })}
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007aff', padding: 10 }]}
          onPress={handleAddPhoneNumber}>
          <Text style={styles.buttonText}>+ Add more number</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Documents</Text>
      <Text style={{ marginBottom: 5 }}>Official Hotel Documents</Text>
      <TouchableOpacity style={styles.uploadBox} onPress={handleChooseDocumentImage}>
        {documentImage ? (
          <Image source={documentImage} style={styles.image} />
        ) : (
          <>
            <Image source={plusIcon} style={styles.icon} />
            <Text style={styles.uploadPlaceholder}>
              Choose Files (Recommended: Image of PDF/Docx) Max. size: 10 MB
            </Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
        <Text style={styles.buttonText}>Update Information</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={phoneModalVisible} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setPhoneModalVisible(false)}>
          <View style={styles.modalBox}>
            {['+95', '+65'].map((code) => (
              <Pressable
                key={code}
                style={styles.modalItem}
                onPress={() => {
                  if (selectedPhoneIndex === -1) {
                    setNewPhone({ ...newPhone, code });
                  } else {
                    const updated = [...phoneNumbers];
                    updated[selectedPhoneIndex].code = code;
                    setPhoneNumbers(updated);
                  }
                  setPhoneModalVisible(false);
                }}>
                <Text>{code}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  alertBox: {
    backgroundColor: '#ecf3ff',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  alertText: { color: '#2a79ff' },
  close: { width: 20, height: 20, resizeMode: 'contain' },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
  },
  uploadBox: {
    height: 150,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  icon: { width: '20%', resizeMode: 'contain' },
  uploadPlaceholder: { marginTop: -40, textAlign: 'center', color: theme.colors.textDark },
  button: { borderRadius: 8 },
  submitButton: {
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 150,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default BasicHotelDetailScreen;
