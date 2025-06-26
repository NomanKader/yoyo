import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  BackHandler,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import ProgressBar from '../components/ProgessBarComponent';
import {RegisterContext} from '../utils/RegisterProvider';
import CustomInput from '../../apartment/components/Input/CustomInput';
import TextInputWithDropdown from '../../apartment/components/Dropdown/TextInputWithDropdown';
import CustomDropdown from '../../apartment/components/Dropdown/CustomDropDown';
import {CheckUser, RequestOTP} from '../service/AuthService';
import CustomAlert from '../alert/CustomAlert';
import hotelIcon from '../assets/hoteldetail.png';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

const countryCodes = [
  {label: '+95', value: '+95'},
  {label: '+66', value: '+66'},
];

export default function RegisterScreen({navigation}) {
  const {registerData, updateRegisterData} = useContext(RegisterContext);
  const [hotelPhoneRaw, setHotelPhoneRaw] = useState('');
  const [userPhoneRaw, setUserPhoneRaw] = useState('');
  const [countryCode, setCountryCode] = useState('+95');
  const [userCountryCode, setUserCountryCode] = useState('+95');
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const onBackPress = () => {
      if (loading) return true;
      return false;
    };

    if (registerData?.phone?.startsWith('+')) {
      const code = countryCodes.find(c =>
        registerData.phone.startsWith(c.value),
      );
      if (code) {
        setUserCountryCode(code.value);
        setUserPhoneRaw(registerData.phone.replace(code.value, ''));
      }
    }

    if (
      Array.isArray(registerData?.hotelPhoneNumbers) &&
      registerData.hotelPhoneNumbers.length > 0 &&
      registerData.hotelPhoneNumbers[0].startsWith('+')
    ) {
      const code = countryCodes.find(c =>
        registerData.hotelPhoneNumbers[0].startsWith(c.value),
      );
      if (code) {
        setCountryCode(code.value);
        setHotelPhoneRaw(
          registerData.hotelPhoneNumbers[0].replace(code.value, ''),
        );
      }
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => backHandler.remove();
  }, [loading]);

  const isValid =
    registerData.hotelName &&
    registerData.username &&
    registerData.idCardNo &&
    registerData.fullName &&
    registerData.email &&
    registerData.email.includes("@") &&
    registerData.phone &&
    registerData.role &&
    registerData.hotelEmail &&
    userPhoneRaw &&
    hotelPhoneRaw &&
    registerData.hotelPhoneNumbers;

  const handleChange = (key, value) => {
    if (key === 'hotelPhoneNumbers') {
      setHotelPhoneRaw(value);
      updateRegisterData(key, [countryCode + value]);
    } else if (key === 'phone') {
      setUserPhoneRaw(value);
      updateRegisterData('phone', userCountryCode + value);
    } else {
      updateRegisterData(key, value);
    }
  };

const checkUser = async () => {
  const postBody = {
    username: registerData?.username,
    email: registerData?.email,
  };

  try {
    const response = await CheckUser(postBody);

    if (response?.data) {
      const {isUsernameExist, isEmailExist} = response.data;

      if (isUsernameExist || isEmailExist) {
        let msg = '';
        if (isUsernameExist && isEmailExist) {
          msg = 'Username and email are already registered.';
        } else if (isUsernameExist) {
          msg = 'Username is already taken.';
        } else if (isEmailExist) {
          msg = 'Email is already registered.';
        }

        setAlertVisible(true);
        setMessage(msg);
        return false;
      }

      // ✅ Safe to continue
      return true;
    } else {
      // Fallback if no data
      setAlertVisible(true);
      setMessage('Unexpected response from server.');
      return false;
    }
  } catch (error) {
    console.error('Error checking user:', error);
    setAlertVisible(true);
    setMessage('Something went wrong. Please try again.');
    return false;
  } finally {
    setLoading(false);
  }
};

const getOTP = async () => {
  setLoading(true);
  const isAvailable = await checkUser();
  if (!isAvailable) return;
  const postBody = {
    phone: null,
    email: registerData.email || '',
    code: null,
  };

  try {
    const response = await RequestOTP(postBody);
    if (response.success) {
      navigation.navigate('OTP', {
        resendTime: response.data?.codeExpireTime,
      });
    } else {
      setAlertVisible(true);
      setMessage(
        'Email does not exist. Please register first or check your email to get OTP code.',
      );

      console.warn(
        'Failed to request OTP:',
        response.message || 'Unknown error',
      );
    }
  } catch (error) {
    console.error('Failed to request OTP:', error);
  } finally {
    setLoading(false);
  }
};

return (
  <View style={styles.container}>
    <HeaderComponent
      title={'Basic Information'}
      onPress={loading ? null : () => navigation.goBack()}
    />
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      showsVerticalScrollIndicator = {false}
      keyboardShouldPersistTaps="handled">
      <CustomAlert
        visible={alertVisible}
        title={'Warning'}
        message={message}
        onClose={setAlertVisible}
      />
      <ProgressBar
        contentContainerStyle={{marginTop: -10}}
        currentStep={1}
        totalSteps={5}
      />

      {/* Logo & Hotel Header */}
      <View style={{alignItems: 'center', marginTop: 10}}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={hotelIcon} style={styles.hotelIcon} />
        </View>
        <Text style={{marginTop: 8, fontWeight: '600'}}>
          Basic Hotel Details
        </Text>
      </View>
      {/* Hotel Inputs */}
      <CustomInput
        label={'Name of Hotel'}
        bgColor="#f2f2f2"
        placeholder={'Enter hotel name'}
        value={registerData?.hotelName}
        onChangeText={value => handleChange('hotelName', value)}
        editable={!loading}
      />
      <CustomInput
        multiline
        label={'Hotel Description (Optional)'}
        bgColor="#f2f2f2"
        placeholder={'Enter description'}
        value={registerData?.hotelDescription}
        onChangeText={value => handleChange('hotelDescription', value)}
        editable={!loading}
      />
      <CustomInput
        label={'Hotel Email Address'}
        bgColor="#f2f2f2"
        placeholder={'Enter email address'}
        value={registerData?.hotelEmail}
        onChangeText={value => handleChange('hotelEmail', value)}
        keyboardType="email-address"
        editable={!loading}
      />
      <TextInputWithDropdown
        label="Hotel Phone Number"
        value={hotelPhoneRaw}
        onChangeText={value => handleChange('hotelPhoneNumbers', value)}
        dropdownValue={countryCode}
        placeholer="000 0000 000"
        setDropdownValue={value => {
          setCountryCode(value);
          updateRegisterData('hotelPhoneNumbers', [value + hotelPhoneRaw]);
        }}
        dropdownData={countryCodes}
        position="front"
        bgColor="#f2f2f2"
        editable={!loading}
      />

      {/* User Info Header */}
      <View style={styles.iconSection}>
        <View style={styles.iconWrapper}>
          <MIcon name="person" size={40} color="#111" />
        </View>
        <Text style={styles.sectionTitle}>User Information</Text>
      </View>

      {/* User Inputs */}
      <CustomInput
        label={'Username'}
        bgColor="#f2f2f2"
        placeholder={'Enter username'}
        value={registerData?.username}
        onChangeText={value => handleChange('username', value)}
        editable={!loading}
      />
      <CustomInput
        label={'ID Card Number'}
        bgColor="#f2f2f2"
        placeholder={'Enter ID card number'}
        value={registerData?.idCardNo}
        onChangeText={value => handleChange('idCardNo', value)}
        editable={!loading}
      />
      <CustomInput
        label={'Full Name'}
        bgColor="#f2f2f2"
        placeholder={'Enter your full name'}
        value={registerData?.fullName}
        onChangeText={value => handleChange('fullName', value)}
        editable={!loading}
      />
      <CustomInput
        label={'Email Address (OTP will be sent to this address)'}
        bgColor="#f2f2f2"
        placeholder={'Enter email address'}
        value={registerData?.email}
        onChangeText={value => handleChange('email', value)}
        keyboardType="email-address"
        editable={!loading}
      />
      <TextInputWithDropdown
        label="Phone Number"
        value={userPhoneRaw}
        onChangeText={value => handleChange('phone', value)}
        dropdownValue={userCountryCode}
        placeholer="000 0000 000"
        setDropdownValue={value => {
          setUserCountryCode(value);
          updateRegisterData('phone', value + userPhoneRaw);
        }}
        dropdownData={countryCodes}
        position="front"
        bgColor="#f2f2f2"
        editable={!loading}
      />
      <CustomDropdown
        label="User Role"
        data={[
          {label: 'Owner', value: 'owner'},
          {label: 'Manager', value: 'manager'},
          {label: 'Reception', value: 'reception'},
        ]}
        value={registerData?.role}
        setValue={value => updateRegisterData('role', value)}
        placeholder="Please select user role"
        bgColor="#f2f2f2"
        disabled={!loading}
      />

      {/* Submit Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          disabled={!isValid || loading}
          style={[
            styles.button,
            (!isValid || loading) && styles.buttonDisabled,
          ]}
          onPress={getOTP}>
          <Text style={styles.buttonText}>
            {loading ? 'Proceeding...' : 'Proceed'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.06,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  hotelIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#0E101F',
  },

  iconSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 32,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: 6,
    fontWeight: '600',
    fontSize: 16,
    color: '#111',
  },

  sectionHeader: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomSection: {
    marginTop: 20,
    marginBottom: 50,
  },
});
