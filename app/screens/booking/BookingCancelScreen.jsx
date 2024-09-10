import {Text, View} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import {CommonStyles} from '../../style/CommonStyles';
import DividerComponent from '../../components/Divider/DividerComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import paymentSuccessIcon from '../../assets/icons/paymentSuccessIcon.png';

export default function BookingCancelScreen({navigation}) {
  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent
        title={'Booking cancellation process'}
        navigation={navigation}
      />
      <DividerComponent />
      <View style={CommonStyles.dividerView}>
        <Text style={CommonStyles.infoLabel}>
          Email and notification was sent to customer successfully. Please wait
          the response from Customer.
        </Text>
      </View>
      <View style={CommonStyles.defaultButtonContainer}>
      <DefaultButtonComponent
          title={'Proceed'}
          backgroundColor={theme.colors.primary}
          onPress={() => {
            navigation.navigate('SuccessScreen', {
              header: 'Cancel Successful',
              subheader:'',
              nextScreen: 'AppStack', // Pass the screen name as a string
            //   nextScreenParams: {screen:'AppStack'},
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
