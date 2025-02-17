import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {act, useEffect, useRef, useState} from 'react';
import theme from '../../style/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import FormikTextInputComponent from '../../components/Formik/FormikTextInputComponent';
import FormikPhoneInputComponent from '../../components/Formik/FormikPhoneInputComponent';
import FormikDateInputComponent from '../../components/Formik/FormikDateInputComponent';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';

import {CommonStyles} from '../../style/CommonStyles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormikDropdownPickerComponent from '../../components/Formik/FormikDropdownPickerComponent';
import {reserveBooking} from '../../services/BookingService';

const {width, height} = Dimensions.get('window');

const ReservationForm = ({navigation}) => {
  const [customerId, setCustomerId] = useState(0);

  const [showLoading, setShowLoading] = useState(false);
  let initialCall = useRef(false);
  const [reserveInfo, setReserveInfo] = useState([]);

  const [rtOpen, setRtOpen] = useState(false);

  const [roomTypes, setRoomTypes] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const [rnOpen, setRnOpen] = useState(false);

  const [roomNumber, setRoomNumber] = useState([]);

  const fetchReserveInfo = async () => {
    if (showLoading) return;
    setShowLoading(true);
    try {
      const storedData = await AsyncStorage.getItem('reserveInfo');
      if (storedData) {
        setReserveInfo(JSON.parse(storedData));
      }
      const customerData = await AsyncStorage.getItem('id');
      console.log(customerData, 'CustomerData');
      if (customerData) {
        setCustomerId(JSON.parse(customerData));
      }
      const roomTypesData = await AsyncStorage.getItem('roomTypes');
      if (roomTypesData) {
        setRoomTypes(JSON.parse(roomTypesData));
      }
      const roomNumbers = await AsyncStorage.getItem('roomNumbers');
      if (roomNumbers) {
        setRoomNumber(JSON.parse(roomNumbers));
      }
      const startDateResult = await AsyncStorage.getItem('startDate');
      const startDateData = new Date(JSON.parse(startDateResult));
      console.log('startDateResult', startDateData, typeof startDateData);
      if (startDateData) {
        setStartDate(startDateData);
      }
    } catch (error) {
      console.error('Error fetching reserveInfo:', error);
    } finally {
      setShowLoading(false);
    }
  };

  useEffect(() => {
    if (initialCall.current) return;
    initialCall.current = true;

    fetchReserveInfo();
  }, []);

  const onConfirm = async (values, actions) => {
    values.dateOfArrival = values.dateOfArrival
      ? new Date(values.dateOfArrival).toISOString()
      : '';
    console.log('FormeikConfirmValues', values);
    try {
      const response = await reserveBooking(values);
      console.log('onConfirm', response);
    } catch (error) {
      console.log('reserveBooking error', error);
    }

    navigation.navigate('AppStack', {
      screen: 'ReserveConfirmScreen',
      params: {
        values,
      },
    });
    actions.resetForm();
  };

  if (showLoading) {
    return <Text>Loading...</Text>;
  }

  const initialValues = {
    customerName: 'Aung Aung',
    email: '',
    phoneNo: '',
    numberOfDays: '',
    dateOfArrival: startDate,
    roomId: reserveInfo.roomID || '',
    roomNumberId: reserveInfo.roomNumberId || '',
    noOfCheckIn: '',
    hotelId: reserveInfo.hotelId || '',
    customerId: customerId || '',
  };

  console.log(initialValues);

  // console.log(initialValues);

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phoneNo: Yup.string().required('Phone number is required'),
    roomId: Yup.string().required('Room type is required'),
    roomNumberId: Yup.string().required('Room number is required'),
    numberOfDays: Yup.string().required('Number of days is required'),
    noOfCheckIn: Yup.string().required('Number of checkin is required'),
    dateOfArrival: Yup.date().required('Date of arrival is required'),
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponentStyle={CommonStyles.container}
        ListHeaderComponent={
          <>
            <DetailAppBarComponent
              title="Reservation Form"
              navigation={navigation}
            />
            <DividerComponent />

            <View style={CommonStyles.scrollViewContainer}>
              <View style={styles.container}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, actions) => onConfirm(values, actions)}>
                  {formikProps => {
                    console.log('Formik Current Values:', formikProps.values);
                    return (
                      <>
                        <FormikTextInputComponent
                          label="Name"
                          placeholder="Name..."
                          // value={name}
                          // onChangeText={setName}
                          keyboardType=""
                          isSecure={false}
                          formikKey="customerName"
                          formikProps={formikProps}
                        />

                        <FormikTextInputComponent
                          label="Email Address"
                          placeholder="Email..."
                          // value={email}
                          // onChangeText={setEmail}
                          keyboardType="email-address"
                          isSecure={false}
                          formikKey="email"
                          formikProps={formikProps}
                        />
                        <FormikPhoneInputComponent
                          label="Phone Number"
                          // value={phone}
                          // onChange={setPhone}
                          formikKey="phoneNo"
                          formikProps={formikProps}
                        />

                        <Text style={CommonStyles.formLabel}>Room Type</Text>
                        <FormikDropdownPickerComponent
                          // open={rtOpen}
                          // setOpen={setRtOpen}
                          formikKey={'roomId'}
                          formikProps={formikProps}
                          items={roomTypes}
                          // setItems={setRoomTypes}
                          placeholder="Select a room type"
                        />

                        <Text style={CommonStyles.formLabel}>Room Number</Text>
                        <FormikDropdownPickerComponent
                          // open={rnOpen}
                          // setOpen={setRnOpen}
                          formikKey={'roomNumberId'}
                          formikProps={formikProps}
                          items={roomNumber}
                          // setItems={setRoomNumber}
                          placeholder="Select a room number"
                          containerStyle={styles.dropdownContainer}
                        />

                        <FormikTextInputComponent
                          label="Number of days"
                          placeholder="Number of days..."
                          // value={days}
                          // onChangeText={setDays}
                          keyboardType="numeric"
                          isSecure={false}
                          formikKey="numberOfDays"
                          formikProps={formikProps}
                        />

                        <FormikTextInputComponent
                          label="Number of checkin"
                          placeholder="Number of checkin..."
                          // value={days}
                          // onChangeText={setDays}
                          keyboardType="numeric"
                          isSecure={false}
                          formikKey="noOfCheckIn"
                          formikProps={formikProps}
                        />

                        <FormikDateInputComponent
                          title="Date of arrival"
                          // value={dateOfArrival}
                          // onChange={setDateOfArrival}
                          formikKey="dateOfArrival"
                          formikProps={formikProps}
                        />

                        <DefaultButtonComponent
                          title="Continue"
                          backgroundColor={theme.colors.primary}
                          onPress={formikProps.handleSubmit}
                          // onPress={() => Alert.alert('hi')}
                          color={theme.colors.textLight}
                          otherStyle={styles.continueButton}
                          otherTextStyle={{fontSize: 16}}
                          // disable={isButtonDisabled || showLoading}
                        />
                      </>
                    );
                  }}
                </Formik>

                {showLoading && <ActivityIndicator size="large" />}
              </View>
            </View>
          </>
        }
      />
      {/* <ScrollView style={CommonStyles.container} >
          
        </ScrollView> */}
    </SafeAreaView>
  );
};

export default ReservationForm;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    width: '100%',
  },
  dropdownContainer: {
    zIndex: 4999,
  },
  continueButton: {
    width: width * 0.9,
    height: height * 0.07,
    alignSelf: 'center',
    marginTop: 25,
  },
});
