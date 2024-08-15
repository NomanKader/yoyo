import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {CommonStyles} from '../style/CommonStyles';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../components/Divider/DividerComponent';
import ListComponent from '../components/List/ListComponent';
import paymentIcon from '../assets/icons/paymentIcon.png';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';
import theme from '../style/colors';
import base64Data from '../config/base64Data';
export default function PaymentScreen({navigation}) {
  const paymentMethods = [
    {id: 1, header: 'Cash', subheader: 'Pay instantly for the check-in'},
    {id: 2, header: 'Kpay', subheader: 'Pay instantly for the check-in'},
    {id: 3, header: 'Bank', subheader: 'Pay instantly for the check-in'},
  ]; 

  const [selectedMethodId, setSelectedMethodId] = useState(1);

  const handleRadioPress = id => {
    setSelectedMethodId(id);
  };

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
      {paymentMethods.map(method => (
        <React.Fragment key={method.id}>
          <ListComponent
            icon={paymentIcon}
            header={method.header}
            subheader={method.subheader}
            isRadio={true}
            radioButtons={[{id: method.id, label: ''}]} // Passing a single radio button for each item
            selectedId={selectedMethodId}
            onRadioPress={handleRadioPress}
          />
          <DividerComponent />
        </React.Fragment>
      ))}

      {/* Kpay QR Code Section */}
      {selectedMethodId === 2 && ( // Kpay has an ID of 2
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={CommonStyles.header}>Kpay QR Code</Text>
          <Image
            source={{ uri: base64Data[0].kpayQR}}
            style={CommonStyles.list.qrCode}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={CommonStyles.defaultButtonContainer}>
        <DefaultButtonComponent
          title={'Proceed'}
          backgroundColor={theme.colors.primary}
          onPress={() => {
            navigation.navigate('SuccessScreen', {
              header: 'Payment Successful',
              subheader:
                'Payment for Room 406 is successful and the ID is CAL7394748',
              nextScreen: 'AppStack', // Pass the screen name as a string
              nextScreenParams: {screen: 'RoomCategoryCreateScreen'},
              navigation: navigation,
            });
          }}
        />
      </View>
    </View>
  );
}
