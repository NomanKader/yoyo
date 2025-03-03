import {View, Text, TextInput, Touchable, TouchableOpacity} from 'react-native';
import {CommonStyles} from '../../styles/CommonStyles';
import theme from '../../styles/colors';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
export default function ConfirmEmailScreen({navigation}) {
  return (
    <View style={CommonStyles.container}>
      <Text style={[CommonStyles.header, {marginTop: '50%'}]}>
        Confirm Email Screen
      </Text>
      <Text style={[CommonStyles.subHeader, {width: 300, textAlign: 'center'}]}>
        Enter your account's email and we'll send a password reset code.
      </Text>
      {/* add react native text input */}
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderBottomWidth: 1,
          width: 300,
          marginTop: 30,
          padding: 10,
          marginBottom:20
        }}
        placeholder="Enter your email"
        placeholderTextColor={theme.colors.darkGray}
        maxLength={35}
      />
      <View style={{width:350}}>
      <DefaultButtonComponent title={'Send Code'} onPress={() => {navigation.navigate('verifyOTP')}} />
        </View>
    </View>
  );
}
