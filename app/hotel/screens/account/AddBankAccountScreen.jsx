import {ScrollView, Text, View} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import {CommonStyles} from '../../style/CommonStyles';
import DividerComponent from '../../components/Divider/DividerComponent';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import {useState} from 'react';
import DropdownPickerComponent from '../../components/Dropdown/DropdownPickerComponent';
import TypoInfoComponent from '../../components/Typography/TypoInfoComponent';
import bankList from '../../config/bankList';
import checkIcon from '../../assets/icons/checkIcon.png';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
export default function AddBankAccountScreen({navigation}) {
  const [list, setList] = useState(bankList);
  const [open, setOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState();
  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent
        title={'Add Bank Account'}
        navigation={navigation}
      />
      <DividerComponent />
      <Text style={CommonStyles.subHeader}>
        Please add the hotel bank account details to withdraw
      </Text>
      <TextInputComponent
        label={'Account Number'}
        placeholder={'Enter Account Number'}
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType={'number'}
        isSecure={false}
      />
      <View style={CommonStyles.dividerView}>
        <Text style={CommonStyles.infoLabel}>Select Bank</Text>
        <DropdownPickerComponent
          open={open}
          setOpen={setOpen}
          value={selectedBank}
          setValue={setSelectedBank}
          items={list}
          setItems={setList}
          placeholder={'Select Bank'}
          multiple={false}
        />
        <TypoInfoComponent
          icon={checkIcon}
          label={(accountNumber && selectedBank)?"Tun Tun":"User not yet recognized. Please enter details"}
          backgroundColor={theme.colors.typoInfoColor} // optional, will default to #F5F5F5 if not provided
        />
      </View>
      <View style={CommonStyles.defaultButtonContainer}>
        <DefaultButtonComponent
          title={'Continue'}
          backgroundColor={theme.colors.primary}
          onPress={()=>navigation.navigate('AppStack',{screen:'WithdrawScreen',params:{bankInfo:selectedBank+'-'+accountNumber}})}
        />
      </View>
    </View>
  );
}
