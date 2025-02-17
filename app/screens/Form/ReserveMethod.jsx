import React from 'react';
import {View} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import PaymentListComponent from '../../components/List/PaymentListComponent';
import {CommonStyles} from '../../style/CommonStyles';

const ReserveMethod = ({navigation}) => {
  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent
        title="Reservation Method"
        navigation={navigation}
      />
      <DividerComponent />
      <PaymentListComponent
        icon="credit-card"
        title="Pay with Kpay"
        description="Make instant payment with ATM "
        //   onPress={() => {
        //     navigation.navigate('AppStack', {screen: 'ReserveConfirmScreen'});
        //   }
        // }
        onPress={() => {
          // navigation.goBack();
          navigation.push('AppStack', {
            screen: 'ReserveConfirmScreen',
            params: {showBottomTab: true},
          });
          console.log('Button Pressed');
        }}
      />
      <PaymentListComponent
        icon="credit-card"
        title="Pay with Wavepay"
        description="Make instant payment with ATM "
        //   onPress={() => {
        //     navigation.navigate('AppStack', {screen: 'ReserveConfirmScreen'});
        //   }
        // }
        onPress={() => {
          // navigation.goBack();
          navigation.push('AppStack', {
            screen: 'ReserveConfirmScreen',
            params: {showBottomTab: true},
          });
          console.log('Button Pressed');
        }}
      />
      <PaymentListComponent
        icon="credit-card"
        title="Pay with Ayapay"
        description="Make instant payment with ATM "
        //   onPress={() => {
        //     navigation.navigate('AppStack', {screen: 'ReserveConfirmScreen'});
        //   }
        // }
        onPress={() => {
          // navigation.goBack();
          navigation.push('AppStack', {
            screen: 'ReserveConfirmScreen',
            params: {showBottomTab: true},
          });
          console.log('Button Pressed');
        }}
      />
      <PaymentListComponent
        icon="columns"
        title="Book on hold"
        description="Make reservation on hold"
        onPress={() => {
          navigation.navigate('AppStack', {screen: 'BookingSuccessfulScreen'});
        }}
      />
      <PaymentListComponent
        icon="dollar-sign"
        title="Pay on Arrival"
        description="Pay for reservation on your arrival"
        onPress={() => {
          navigation.navigate('AppStack', {screen: 'BookingSuccessfulScreen'});
        }}
      />
    </View>
  );
};

export default ReserveMethod;
