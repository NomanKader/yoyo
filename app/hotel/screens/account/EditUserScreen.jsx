import { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import DropdownPickerComponent from '../../components/Dropdown/DropdownPickerComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import { CommonStyles } from '../../style/CommonStyles';
import theme from '../../style/colors';
import PhoneInputComponent from '../../components/TextInput/PhoneInputComponent';
import roleItems from '../../config/roles';

export default function EditUserScreen({ navigation, route }) {
  // Destructure route.params to get the email, phoneNumber, pin, and role
  const { email: initialEmail, phoneNumber: initialPhoneNumber, pin: initialPin, role: initialRole } = route?.params;

  // Initialize state using the values from route.params
  const [email, setEmail] = useState(initialEmail || '');
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');
  const [role, setRole] = useState(initialRole || '');
  const [roleOpen, setRoleOpen] = useState(false);
  const [pin, setPin] = useState(initialPin || '');

  useEffect(() => {
    // Update states in case route.params change
    if (route.params) {
      setEmail(route.params.email || '');
      setPhoneNumber(route.params.phoneNumber || '');
      setPin(route.params.pin || '');
      setRole(route.params.role || '');
    }
  }, [route.params]);

  return (
    <ScrollView style={{ flexGrow: 1, backgroundColor: theme.colors.textLight }}>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent title={''} navigation={navigation} />
        <Text style={CommonStyles.header}>Edit User</Text>
        <Text style={CommonStyles.subHeader}>
          Update account details by updating the forms below.
        </Text>
        <View style={CommonStyles.dividerView}>
          <TextInputComponent
            label="Email address"
            placeholder="Enter email"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={CommonStyles.dividerView}>
          <PhoneInputComponent
            label={'Phone Number'}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <View style={CommonStyles.dividerView}>
          <TextInputComponent
            label="Pin"
            placeholder="Enter pin"
            onChangeText={setPin}
            value={pin}
            isSecure={true}
          />
        </View>

        <View style={CommonStyles.dividerView}>
          <Text style={CommonStyles.infoLabel}>Select Role</Text>
          <DropdownPickerComponent
            open={roleOpen}
            setOpen={setRoleOpen}
            value={role}
            setValue={setRole}
            items={roleItems}
            placeholder="Select a role"
            multiple={false}
          />
        </View>
        <DefaultButtonComponent
          title="Proceed"
          onPress={() => navigation.navigate('AppStack',{screen:'UpdatePasswordScreen'})}
          backgroundColor={theme.colors.primary}
        />
      </View>
    </ScrollView>
  );
}
