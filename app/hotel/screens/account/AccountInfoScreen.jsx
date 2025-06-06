import React, {useState} from 'react';
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
import HeaderComponent from '../../../apartment/components/Divider/HeaderComponent';
import closeIcon from '../../assets/icons/closeIcon.png'; // Adjust the path as necessary
import plusIcon from '../../assets/icons/plusIcon.png'; // Adjust the path as necessary
import theme from '../../style/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountInfoScreen = ({navigation}) => {
  const [username, setUsername] = useState('kohtun');
  const [idNumber, setIdNumber] = useState('087765');
  const [fullname, setFullname] = useState('Ko Htun Htun');
  const [email, setEmail] = useState('ahotel@gmail.com');
  const [phoneCode, setPhoneCode] = useState('+95');
  const [phone, setPhone] = useState('09089467010');
  const [role, setRole] = useState('Owner');
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [showAlertBox, setShowAlertBox] = useState(true);

  const chooseImage = async setImage => {
    const image = await ImagePicker.openPicker({
      mediaType: 'photo',
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 800,
      compressImageQuality: 0.8,
    });
    setImage({uri: image.path});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderComponent
        title="Account Information"
        onPress={() => navigation.goBack()}
      />
      {showAlertBox && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
            Please upload your ID cards below!
          </Text>
          <TouchableOpacity onPress={() => setShowAlertBox(false)}>
            <Image source={closeIcon} style={styles.close} />
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>ID Card Number</Text>
      <TextInput
        style={styles.input}
        value={idNumber}
        onChangeText={setIdNumber}
      />

      <Text style={styles.label}>Fullname</Text>
      <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={setFullname}
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setModalVisible(true)}>
          <Text>{phoneCode}</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, {flex: 1}]}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <Text style={styles.label}>User Role</Text>
      <TouchableOpacity
        style={[styles.input, styles.dropdownWithIcon]}
        onPress={() => setRoleModalVisible(true)}>
        <Text>{role}</Text>
        <Icon name="chevron-down" size={18} color="#333" />
      </TouchableOpacity>

      <Text style={styles.label}>ID Card - Front</Text>
      <TouchableOpacity
        style={styles.uploadBox}
        onPress={() => chooseImage(setIdFront)}>
        {idFront ? (
          <Image source={idFront} style={styles.image} />
        ) : (
          <>
            <Image source={plusIcon} style={styles.icon} />
            <Text style={styles.uploadPlaceholder}>
              Choose Image{'\n'}( Max. size 5 MB )
            </Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>ID Card - Back</Text>
      <TouchableOpacity
        style={styles.uploadBox}
        onPress={() => chooseImage(setIdFront)}>
        {idBack ? (
          <Image source={idBack} style={styles.image} />
        ) : (
          <>
            <Image source={plusIcon} style={styles.icon} />
            <Text style={styles.uploadPlaceholder}>
              Choose Image{'\n'}( Max. size 5 MB )
            </Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Update Information</Text>
      </TouchableOpacity>
      {/* Phone number modal */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalBox}>
            {['+95', '+65'].map(code => (
              <Pressable
                key={code}
                style={styles.modalItem}
                onPress={() => {
                  setPhoneCode(code);
                  setModalVisible(false);
                }}>
                <Text>{code}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
      {/* User role modal */}
      <Modal transparent={true} visible={roleModalVisible} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setRoleModalVisible(false)}>
          <View style={styles.modalBox}>
            {['Owner', 'Manager', 'Staff'].map(item => (
              <Pressable
                key={item}
                style={styles.modalItem}
                onPress={() => {
                  setRole(item);
                  setRoleModalVisible(false);
                }}>
                <Text>{item}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  icon: {
    width: '20%',
    resizeMode: 'contain',
  },
  uploadPlaceholder: {
    marginTop: -40,
    textAlign: 'center',
    color: theme.colors.textDark,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  alertBox: {
    backgroundColor: '#ecf3ff',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  alertText: {color: '#2a79ff'},
  close: {
    fontSize: 16,
    color: '#007aff',
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  label: {marginTop: 10, fontWeight: 'bold'},
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
  },
  dropdown: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  uploadBox: {
    height: 200,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  image: {width: '100%', height: '100%', borderRadius: 8},
  button: {
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
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
  dropdownWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AccountInfoScreen;
