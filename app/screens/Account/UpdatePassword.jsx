import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CommonStyles} from '../../style/CommonStyles';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import theme from '../../style/colors';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';

const {width, height} = Dimensions.get('window');

const UpdatePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyNewPassword, setVerifyNewPassword] = useState('');

  return (
    <ScrollView style={CommonStyles.container}>
      <DetailAppBarComponent title="Update Password" navigation={navigation} />
      <DividerComponent />

      <View style={CommonStyles.scrollViewContainer}>
        <TextInputComponent
          label="Old Password"
          placeholder="Enter old password..."
          value={oldPassword}
          onChangeText={setOldPassword}
          keyboardType="numeric"
          isSecure={true}
        />
        <TextInputComponent
          label="New Password"
          placeholder="Enter new password..."
          value={newPassword}
          onChangeText={setNewPassword}
          keyboardType="numeric"
          isSecure={true}
        />
        <TextInputComponent
          label="Verify New Password"
          placeholder="Re-enter new password..."
          value={verifyNewPassword}
          onChangeText={setVerifyNewPassword}
          keyboardType="numeric"
          isSecure={true}
        />
        <DefaultButtonComponent
          title="Update"
          backgroundColor={theme.colors.primary}
          onPress={() => {
            navigation.goBack();
          }}
          color={theme.colors.textLight}
          otherStyle={styles.updateButton}
          otherTextStyle={{fontSize: 16}}
          disable={false} //{isButtonDisabled || showLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  updateButton: {
    width: width * 0.9,
    height: height * 0.07,
    alignSelf: 'center',
    marginTop: height * 0.42,
  },
});

export default UpdatePassword;
