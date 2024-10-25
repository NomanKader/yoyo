import {useState} from 'react';
import {View} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import {CommonStyles} from '../../style/CommonStyles';
import DividerComponent from '../../components/Divider/DividerComponent';
import TypoInfoComponent from '../../components/Typography/TypoInfoComponent';
import checkIcon from '../../assets/icons/checkIcon.png';
import theme from '../../style/colors';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';

export default function WithdrawScreen({route, navigation}) {
  const [amount, setAmount] = useState();
  const {bankInfo} = route.params;
  
  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent title={'Withdraw'} navigation={navigation} />
      <DividerComponent />
      <TypoInfoComponent
        icon={checkIcon}
        backgroundColor={theme.colors.typoInfoColor}
        label={'0.00 MMK'}
      />
      <TextInputComponent
        label={'Amount'}
        placeholder={'Enter Amount'}
        value={amount}
        onChangeText={setAmount}
        keyboardType={'number'}
        isSecure={false}
      />
      <View style={CommonStyles.defaultButtonContainer}>
        <DefaultButtonComponent
          title={'Proceed'}
          backgroundColor={theme.colors.primary}
          onPress={() =>
            navigation.navigate('AppStack', {
              screen: 'OTPScreen',
              params: {bankInfo: bankInfo, amount: amount},
            })
          }
        />
      </View>
    </View>
  );
}
