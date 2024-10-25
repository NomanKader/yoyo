import {Text, View} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import {CommonStyles} from '../../style/CommonStyles';
import DropdownPickerComponent from '../../components/Dropdown/DropdownPickerComponent';
import {useState} from 'react';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import paymentSuccessIcon from '../../assets/icons/paymentSuccessIcon.png';
export default function BookingCancelSettingScreen({navigation}) {
  const useDropdown = (
    defaultItems = [
      {label: 'Allowed', value: 'allowed'},
      {label: 'Not allowed', value: 'notAllowed'},
    ],
  ) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(defaultItems);
    return {
      open,
      setOpen,
      value,
      setValue,
      items,
      setItems,
    };
  };
  const {open, setOpen, value, setValue, items, setItems} = useDropdown();
  const [numberOfDays,setNumberOfDays]=useState();
  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent
        title={'Booking cancel setting'}
        navigation={navigation}
      />
      <Text style={[CommonStyles.subHeader, {marginBottom: 30}]}>
        Please add setting
      </Text>
      <Text style={CommonStyles.infoLabel}>Choose setting</Text>
      <DropdownPickerComponent
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        items={items}
        setItems={setItems}
        placeholder={'Choose setting'}
        multiple={false}
      />
      <TextInputComponent
        label={'cancellation time before check-in (Days)'}
        placeholder={'Enter number of days before check-in'}
        value={numberOfDays}
        onChangeText={setNumberOfDays}
        keyboardType={'number-pad'}
        isSecure={false}
      />
      <View style={CommonStyles.defaultButtonContainer}>
        <DefaultButtonComponent title={"Confirm"} 
        backgroundColor={theme.colors.primary}
        color={theme.colors.textLight}
        onPress={() => {
            navigation.navigate('SuccessScreen', {
              header: 'Confirm Successful',
              subheader:'',
              nextScreen: 'AppStack',
              navigation: navigation,
              icon:paymentSuccessIcon,
              isShowingIllustration:true,
              buttonText:"Back to home",
              color:theme.colors.primary
            });
          }}
        />
      </View>
    </View>
  );
}
