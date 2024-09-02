import {Image, StyleSheet, Text, View} from 'react-native';
import walletPaymentIcon from '../../assets/icons/walletPaymentIcon.png';
import {CommonStyles} from '../../style/CommonStyles';
import RoundButtonComponent from '../../components/Button/RoundButtonComponent';
export default function WithdrawSuccessScreen({route, navigation}) {
  const {bankInfo, amount} = route.params;
  return (
    <View style={CommonStyles.scrollViewContainer}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Image
          source={walletPaymentIcon}
          style={{width: 100, height: 100, marginBottom: 20}}
        />
        <Text style={[CommonStyles.subHeader, {fontSize: 20}]}>
          Pending withdrawal from{' '}
        </Text>
        <Text style={[CommonStyles.text, {fontSize: 20, marginBottom: 10}]}>
          Wallet
        </Text>
        <Text style={[CommonStyles.subHeader,{marginBottom:10}]}>{bankInfo}</Text>
        <Text style={[styles.bottomSheetAmount, {color: '#FF8B33'}]}>
          {`${amount?.includes('-') ? '-' : '+'}${Number(
            Math.abs(parseFloat(amount || 0)),
          ).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </Text>        
        <RoundButtonComponent label={"Let's Go"} onPress={()=>navigation.navigate('TabStack',{screen:'Account'})}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bottomSheetAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom:20
  },
});
