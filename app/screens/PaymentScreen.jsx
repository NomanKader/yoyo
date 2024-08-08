import React from 'react';
import {Image, Text, View} from 'react-native';
import {CommonStyles} from '../style/CommonStyles';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../components/Divider/DividerComponent';
import ListCompnent from '../components/List/ListComponent';
import paymentIcon from '../assets/icons/paymentIcon.png';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';
import theme from '../style/colors';

export default function PaymentScreen({navigation}) {
  const paymentMethods = [
    {header: 'Cash', subheader: 'Pay instantly for the check-in'},
    {header: 'Kpay', subheader: 'Pay instantly for the check-in'},
    {header: 'Bank', subheader: 'Pay instantly for the check-in'},
  ];

  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent
        title={'Choose Payment Method'}
        navigation={navigation}
        searchData={[]}
        type={''}
      />
      <DividerComponent />

      {/* Map through payment methods */}
      {paymentMethods.map((method, index) => (
        <React.Fragment key={index}>
          <ListCompnent
            icon={paymentIcon}
            header={method.header}
            subheader={method.subheader}
          />
          <DividerComponent />
        </React.Fragment>
      ))}

      {/* Kpay QR Code Section */}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={CommonStyles.header}>Kpay QR Code</Text>
        <Image
          source={require('../assets/images/kpay.png')}
          style={{width: 200, height: 200, marginTop: 10}} // Adjust marginTop to add space
          resizeMode="contain" // Ensure the image scales properly
        />
      </View>
      <View style={CommonStyles.dividerView}>
        <DefaultButtonComponent
          title={'Proceed'}
          backgroundColor={theme.colors.primary}
          onPress={() => {
            navigation.navigate('SuccessScreen', {
              header: 'Payment Successful',
              subheader: 'Payment for Room 406 is successful and the   ID is CAL7394748',
              nextScreen: 'AppStack', // Pass the screen name as a string
              nextScreenParams: { screen: 'RoomCategoryCreate' },
              navigation:navigation
            });
          }}
        />
      </View>
    </View>
  );
}
