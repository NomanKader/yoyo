import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import DropdownPickerComponent from '../../components/Dropdown/DropdownPickerComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import { CommonStyles } from '../../style/CommonStyles';
import theme from '../../style/colors';
import PhoneInputComponent from '../../components/TextInput/PhoneInputComponent';
import roleItems from '../../config/roles';

export default function AddUserScreen({ navigation }) {
  // State hooks for managing form inputs
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [roleOpen, setRoleOpen] = useState(false);
  const [role, setRole] = useState('');


  // Handle form submission
  const handleCreateUser = () => {
    console.log('Creating user...');
    // Add your form submission logic here
  };

  return (
    <ScrollView style={CommonStyles.room.container}>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent title="" navigation={navigation} />
        <Text style={CommonStyles.header}>Add New User</Text>
        <Text style={CommonStyles.subHeader}>
          Create a new user to manage and access tracman services.
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
          title="Create User"
          onPress={handleCreateUser}
          backgroundColor={theme.colors.primary}
        />
      </View>
    </ScrollView>
  );
}
