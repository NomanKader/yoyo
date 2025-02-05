import {StyleSheet, View, Dimensions} from 'react-native';
import {useState} from 'react';
import theme from '../../style/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import FormikTextIconInputComponent from '../../components/Formik/FormikTextIconInputComponent';
import FormikTextInputComponent from '../../components/Formik/FormikTextInputComponent';
import FormikDateInputComponent from '../../components/Formik/FormikDateInputComponent';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import {CommonStyles} from '../../style/CommonStyles';
import LeftRightText from '../../components/ConfirmPage/LeftRightText';
import {Formik} from 'formik';
import * as Yup from 'yup';

const {width, height} = Dimensions.get('window');

const PaymentForm = ({navigation}) => {
  const [name, setName] = useState('');
  const [card, setCard] = useState(0);
  const [CVV, setCVV] = useState(0);
  const [expireDate, setExpireDate] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const isButtonDisabled = name === '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponentStyle={CommonStyles.container}
        ListHeaderComponent={
          <>
            <DetailAppBarComponent title="Payment" navigation={navigation} />
            <DividerComponent />

            <View style={CommonStyles.scrollViewContainer}>
              <View style={styles.container}>
                <Formik
                  initialValues={{
                    name: '',
                    ccv: '',
                  }}
                  onSubmit={(values, {resetForm}) => {
                    console.log(values);
                    // navigation.navigate('OtpVerificationScreen');
                  }}>
                  {formikProps => (
                    <>
                      <FormikTextInputComponent
                        label="Name on card"
                        placeholder="Enter Name"
                        value={name}
                        onChangeText={setName}
                        keyboardType=""
                        isSecure={false}
                        formikKey="name"
                        formikProps={formikProps}
                      />

                      <FormikTextIconInputComponent
                        label="Card Number"
                        placeholder="xxxx xxxx xxxx xxxx"
                        value={card}
                        onChangeText={setCard}
                        keyboardType="numeric"
                        isSecure={false}
                      />

                      {/* <Text style={CommonStyles.formLabel}>Room Number</Text> */}

                      <View style={styles.cvvDateContainer}>
                        <View style={styles.cvvInput}>
                          <FormikTextInputComponent
                            label="CVV"
                            placeholder="CVV..."
                            value={CVV}
                            onChangeText={setCVV}
                            keyboardType="numeric"
                            isSecure={false}
                            formikKey="ccv"
                            formikProps={formikProps}
                          />
                        </View>

                        <View style={styles.dateInput}>
                          <FormikDateInputComponent
                            title="Expire date"
                            value={expireDate}
                            onChange={setExpireDate}
                          />
                        </View>
                      </View>
                    </>
                  )}
                </Formik>

                {showLoading && <ActivityIndicator size="large" />}
              </View>
            </View>
          </>
        }
      />
      <View style={styles.footer}>
        <LeftRightText label="Amount" value="0.00" />
        <DefaultButtonComponent
          title="Continue"
          backgroundColor={theme.colors.primary}
          onPress={() => {
            // navigation.navigate('AppStack', {screen: 'PaymentCompleteScreen'});
            navigation.navigate('AppStack', {
              screen: 'ReserveSuccessfulScreen',
            });
          }}
          color={theme.colors.textLight}
          otherStyle={styles.continueButton}
          otherTextStyle={{fontSize: 16}}
          // disable={isButtonDisabled || showLoading}
        />
      </View>
      {/* <ScrollView style={CommonStyles.container} >
          
        </ScrollView> */}
    </SafeAreaView>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: theme.colors.textLight,
  },
  container: {
    width: '100%',
  },
  cvvDateContainer: {
    flexDirection: 'row',
  },
  cvvInput: {
    width: '47%',
  },
  dateInput: {
    width: '47%',
    marginLeft: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
    alignSelf: 'center',
  },
  continueButton: {
    width: width * 0.9,
    height: height * 0.07,
    alignSelf: 'center',
  },
});
