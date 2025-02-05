import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useState} from 'react';
import theme from '../../style/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import FormikTextInputComponent from '../../components/Formik/FormikTextInputComponent';
import FormikPhoneInputComponent from '../../components/Formik/FormikPhoneInputComponent';
import FormikDateInputComponent from '../../components/Formik/FormikDateInputComponent';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import DropdownPickerComponent from '../../components/Dropdown/DropdownPickerComponent';
import {CommonStyles} from '../../style/CommonStyles';
import FormikTextAreaComponent from '../../components/Formik/FormikTextAreaComponent';
import {Formik} from 'formik';
import * as Yup from 'yup';

const {width, height} = Dimensions.get('window');

const RefundForm = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const [rtOpen, setRtOpen] = useState(false);
  const [rtValue, setRtValue] = useState(null);
  const [roomTypes, setRoomTypes] = useState([
    {label: 'Standard Rooms', value: 'standard'},
    {label: 'Deluxe Rooms', value: 'deluxe'},
    {label: 'Executive Rooms', value: 'executive'},
  ]);

  const [rnOpen, setRnOpen] = useState(false);
  const [rnValue, setRnValue] = useState(null);
  const [roomNumber, setRoomNumber] = useState([
    {label: '201', value: '201'},
    {label: '202', value: '202'},
    {label: '203', value: '203'},
    {label: '204', value: '204'},
  ]);

  const isButtonDisabled =
    name === '' || phone === '' || rtValue === '' || rnValue === '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponentStyle={CommonStyles.container}
        ListHeaderComponent={
          <>
            <DetailAppBarComponent
              title="Refund Form"
              navigation={navigation}
            />
            <DividerComponent />

            <View style={CommonStyles.scrollViewContainer}>
              <View style={styles.container}>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                  }}
                  onSubmit={(values, {resetForm}) => {
                    console.log(values);
                    // navigation.navigate('OtpVerificationScreen');
                  }}>
                  {formikProps => (
                    <>
                      <FormikTextInputComponent
                        label="Name"
                        placeholder="Name..."
                        value={name}
                        onChangeText={setName}
                        keyboardType=""
                        isSecure={false}
                        formikKey="name"
                        formikProps={formikProps}
                      />

                      <FormikTextInputComponent
                        label="Email Address"
                        placeholder="Email..."
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        isSecure={false}
                        formikKey="email"
                        formikProps={formikProps}
                      />
                      <FormikPhoneInputComponent
                        label="Phone Number"
                        value={phone}
                        onChange={setPhone}
                        formikKey="phone"
                        formikProps={formikProps}
                      />

                      <Text style={CommonStyles.formLabel}>Room Type</Text>
                      <DropdownPickerComponent
                        open={rtOpen}
                        setOpen={setRtOpen}
                        value={rtValue}
                        setValue={setRtValue}
                        items={roomTypes}
                        setItems={setRoomTypes}
                        placeholder="Select a room type"
                      />

                      <Text style={CommonStyles.formLabel}>Room Number</Text>
                      <DropdownPickerComponent
                        open={rnOpen}
                        setOpen={setRnOpen}
                        value={rnValue}
                        setValue={setRnValue}
                        items={roomNumber}
                        setItems={setRoomNumber}
                        placeholder="Select a room number"
                        containerStyle={styles.dropdownContainer}
                      />

                      <Text style={CommonStyles.formLabel}>
                        Refund description
                      </Text>
                      <FormikTextAreaComponent
                        value={description}
                        onChangeText={setDescription}
                        placeholder=""
                        numberOfLines={4}
                        // backgroundColor = '#F5F5F5'
                        borderRadius={10}
                      />
                    </>
                  )}
                </Formik>

                <DefaultButtonComponent
                  title="Request refund"
                  backgroundColor={theme.colors.primary}
                  onPress={() => {
                    navigation.navigate('AppStack', {
                      screen: 'RefundRequestCompleteScreen',
                    });
                  }}
                  // onPress={() => Alert.alert('hi')}
                  color={theme.colors.textLight}
                  otherStyle={styles.requestButton}
                  otherTextStyle={{fontSize: 16}}
                  // disable={isButtonDisabled || showLoading}
                />

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

export default RefundForm;

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
  requestButton: {
    width: width * 0.9,
    height: height * 0.07,
    alignSelf: 'center',
    marginTop: 25,
  },
});
