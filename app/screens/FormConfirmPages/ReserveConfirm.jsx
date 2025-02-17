import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import {CommonStyles} from '../../style/CommonStyles';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import LeftRightText from '../../components/ConfirmPage/LeftRightText';
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const ReserveConfirm = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const {showBottomTab = false, values} = route.params || {};

  useEffect(() => {
    setVisible(showBottomTab);
    console.log('Value is ' + showBottomTab);
    setBookingData(values);
  }, [showBottomTab]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={CommonStyles.container}>
        {/* Header */}
        <DetailAppBarComponent
          title="Confirm Reservation"
          navigation={navigation}
        />
        <DividerComponent />
        <View style={CommonStyles.scrollViewContainer}>
          {/* Amount */}
          <Text style={styles.amountLabel}>Payable Amount</Text>
          <Text style={styles.amount}>0.00 Kyats</Text>

          {/* Hotel Info */}
          <View style={styles.hotelInfo}>
            <View style={styles.row}>
              <Icon name="wallet" size={30} color={theme.colors.info} />
              <Text style={styles.hotelBadge}>Hotel</Text>
            </View>
            <Text style={styles.hotelName}>A Hotels</Text>
          </View>

          {/* Reservation Details */}
          <View style={styles.reservationDetails}>
            <LeftRightText label="method" value="Pay with debit card" />
            <LeftRightText label="Room type" value="Standard Rooms" />
            <LeftRightText label="Room number" value="Room 406" />
            <LeftRightText label="Number of days" value="1" />
            <LeftRightText label="Date of arrival" value="13-09-2024" />
            <LeftRightText label="Name" value="Tun Tun" />
            <LeftRightText label="Phone number" value="0909008008" />
            <LeftRightText label="Email address" value="tuntun@gmail.com" />
          </View>

          {/* Confirm Button */}
          <DefaultButtonComponent
            title="Confirm"
            onPress={() => {
              navigation.navigate('AppStack', {
                screen: 'ReserveMethodScreen',
              });
            }}
            backgroundColor={theme.colors.info}
          />
        </View>
      </ScrollView>
      <BottomSheetComponent
        title="Pay with Debit Card"
        isVisible={visible}
        onClose={() => setVisible(false)}
        snapPoints={['30%', '40%']}>
        <View>
          <Text style={CommonStyles.formLabel}>
            Use your credit card to complete you reservation. Your payment will
            be visible to Tracman.
          </Text>
          <DefaultButtonComponent
            title="Pay 0.00 Kyats"
            icon="wallet"
            backgroundColor={theme.colors.primary}
            color={theme.colors.textLight}
            otherStyle={styles.payButton}
            otherTextStyle={{fontSize: 16}}
            onPress={() => {
              navigation.navigate('AppStack', {screen: 'PaymentFormScreen'});
            }}
          />
        </View>
      </BottomSheetComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  amountLabel: {
    textAlign: 'center',
    fontSize: 14,
    color: theme.colors.textDark,
  },
  amount: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  hotelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  hotelBadge: {
    backgroundColor: theme.colors.info,
    color: theme.colors.textLight,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginLeft: 5,
  },
  hotelName: {
    color: theme.colors.info,
    fontSize: 16,
  },
  reservationDetails: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  buttonText: {
    color: theme.colors.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    width: width * 0.9,
    height: height * 0.07,
    alignSelf: 'center',
  },
});

export default ReserveConfirm;
