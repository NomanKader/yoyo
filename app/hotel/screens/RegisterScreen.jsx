import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon pack
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon set
import logo from '../assets/icons/yoyologo.png';
import {CommonStyles} from '../style/CommonStyles';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';
import theme from '../style/colors';
import TextInputComponent from '../components/TextInput/TextInputComponent';
import RadioButtonComponent from '../components/Radio/RadioButtonComponent';
import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form'; // For form handling
import * as yup from 'yup'; // For validation schema
import {yupResolver} from '@hookform/resolvers/yup'; // To integrate yup with react-hook-form
import DropDownPicker from 'react-native-dropdown-picker';
import bankListOptions from '../config/bankList';
import UploadPictureScreen from './account/UploadPictureScreen';
import {launchImageLibrary} from 'react-native-image-picker';
import CheckBoxComponent from '../components/Checkbox/CheckboxComponent';
import base64Data from '../config/base64Data';
const {width: screenWidth} = Dimensions.get('window');



export default function RegisterScreen({navigation}) {
  const [activeStep, setActiveStep] = useState(1); // Default active step is 1
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const businessTypeOptions = [
    {id: '1', label: 'Personal'},
    {id: '2', label: 'Company'},
  ];
  const [bankList, setBankList] = useState(bankListOptions);
  const [bankListOpen, setBankListOpen] = useState(false);
  const [chooseBank, setChooseBank] = useState('');
  const [checkTerms, setCheckTerms] = useState(false);
  const [checkConfirm, setCheckConfirm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    businessPhoneNumber: '',
    officeAddress: '',
    businessType: '',
    email:'',
    bank: '',
    bankAccountName: '',
    bankAccountNumber: '',
    logo: { uri: '', base64: '' },
    idFront: { uri: '', base64: '' },
    idBack: { uri: '', base64: '' },
    bankBook: { uri: '', base64: '' },
  });
  // Define validation schema using yup
  const step1Schema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Z])/,
        'Password must contain at least one uppercase letter',
      )
      .matches(
        /^(?=.*[a-z])/,
        'Password must contain at least one lowercase letter',
      )
      .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        'Password must contain at least one special character',
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });
  
  const step2Schema = yup.object().shape({
    businessPhoneNumber: yup
      .string()
      .required('Business phone number is required')
      .matches(/^[0-9]+$/, 'Phone number must be numeric')
      .min(10, 'Phone number must be at least 10 digits long'),
    officeAddress: yup
      .string()
      .required('Office address is required')
      .min(5, 'Office address must be at least 5 characters long'),
    businessType: yup.string().required('Please select a business type'),
  });
  
  const step3Schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Full Name is required')
      .min(3, 'Full Name must be at least 3 characters long'),
    idCardNumber: yup
      .string()
      .required('ID Card Number is required')
      .matches(/^[0-9]+$/, 'ID Card Number must be numeric'),
    email: yup.string().email('Email is not valid').required('Email is required'),
  });
  
  const step4Schema = yup.object().shape({
    bank: yup.string().required('Please select a bank'),
    bankAccountName: yup
      .string()
      .required('Bank Account Name is required')
      .min(3, 'Bank Account Name must be at least 3 characters long'),
    bankAccountNumber: yup
      .string()
      .required('Bank Account Number is required')
      .matches(/^[0-9]+$/, 'Bank Account Number must be numeric'),
  });
  const getSchemaForStep = step => {
    switch (step) {
      case 1:
        return step1Schema;
      case 2:
        return step2Schema;
      case 3:
        return step3Schema;
      case 4:
        return step4Schema; // Add Step 4 schema
      default:
        return step1Schema;
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(getSchemaForStep(activeStep)),
    mode: 'onBlur',
  });

  // On form submit
  // Step 1 submission handler
  const onSubmitStep1 = data => {
    console.log('Payload', data);
    setFormData(prevData => ({
      ...prevData,
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }));
    setActiveStep(2);
  };

  // Step 2 submission handler
  const onSubmitStep2 = data => {
    console.log('Payload', data);
    setFormData(prevData => ({
      ...prevData,
      businessPhoneNumber: data.businessPhoneNumber,
      officeAddress: data.officeAddress,
      businessType: data.businessType,
      email:data.email
    }));
    setActiveStep(3);
  };

  const onSubmitStep3 = data => {
    console.log('Payload', data);
    setFormData(prevData => ({
      ...prevData,
      fullName: data.fullName,
      idCardNumber: data.idCardNumber,
      email: data.email,
    }));
    setActiveStep(4);
    // Proceed to the next step or completion action
  };

  const onSubmitStep4 = data => {
    console.log('Payload', data);
    setFormData(prevData => ({
      ...prevData,
      bank: data.bank,
      bankAccountName: data.bankAccountName,
      bankAccountNumber: data.bankAccountNumber,
    }));
    setActiveStep(5); // Move to next step or final action
  };

  const onSubmitStep5 = data => {
    
    setFormData(prevData => ({
      ...prevData,
      logo: formData.logo,
      idFront: formData.idFront,
      idBack: formData.idBack,
      bankBook:formData.bankBook
    }));
    console.log('Payload', formData);
  }; 
  // Use handleSubmit to conditionally call the appropriate function
  const handleNext = () => {
    if (activeStep === 1) {
      handleSubmit(onSubmitStep1)();
    } else if (activeStep === 2) {
      handleSubmit(onSubmitStep2)();
    } else if (activeStep === 3) {
      handleSubmit(onSubmitStep3)();
    } else if (activeStep === 4) {
      handleSubmit(onSubmitStep4)();
    } else if (activeStep === 5) {
      console.log("nowinstep5")
      if (validateFields()) {
        handleSubmit(onSubmitStep5)();
        // navigation.navigate('AuthStack', {
        //   screen: 'OTPVerification',
        //   params: { email: formData.email }, // Replace yourEmailVariable with the actual email variable
        // });
      }
      else{
        console.log("step5 not ok ")
      }
      
    }
  };

  // Calculate step square size and line length based on screen width
  const stepSquareSize = screenWidth / 10;
  const lineLength = stepSquareSize / 2;
  // Image upload handler
  const handleImageUpload = (field) => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];

          // Update the specific field with both uri and base64
          setFormData((prevData) => ({
            ...prevData,
            [field]: {                           // Use the field name as a key
              uri: selectedImage.uri || '',     // Store the URI for displaying the image
              base64: selectedImage.base64 || '', // Store the Base64 string for submission
            },
          }));
        }
      }
    );
  };
  const ImagePickerFrame = ({onPress, imageUri, label}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.frame}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.imagePreview} />
        ) : (
          <View style={styles.iconContainer}>
            <Icon name="photo-library" size={50} color={'#ccc'} />
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  const validateFields = () => {
    const validationRules = [
      { condition: !formData.logo.uri, message: 'Please upload a logo.' },
      { condition: !formData.idFront.uri, message: 'Please upload ID Card Front.' },
      { condition: !formData.idBack.uri, message: 'Please upload ID Card Back.' },
      { condition: !formData.bankBook.uri, message: 'Please upload Bank Book Copy.' },
      { condition: !checkTerms, message: 'Please accept the Terms & Conditions.' },
      { condition: !checkConfirm, message: 'Please confirm that the information is correct.' },
    ];
  
    for (const rule of validationRules) {
      if (rule.condition) {
        Alert.alert('Error', rule.message);
        return false; // Return false if any validation fails
      }
    }
  
    return true; // All fields are valid
  };
  return (
    <ScrollView contentContainerStyle={CommonStyles.container}>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent title={''} navigation={navigation} />

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={logo} style={{width: 200, height: 80}} />

          {/* Login Information Text */}
          <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>
            Login Information
          </Text>

          {/* Horizontal Stepper with Lines */}
          <View style={styles.stepperContainer}>
            {[1, 2, 3, 4, 5].map((step, index) => (
              <View key={index} style={styles.stepWrapper}>
                <View
                  style={[
                    styles.stepSquare(stepSquareSize),
                    step < activeStep && isFormValid
                      ? styles.successStepSquare
                      : step === activeStep
                      ? styles.activeStepSquare
                      : styles.inactiveStepSquare,
                  ]}>
                  <Text
                    style={[
                      styles.stepLabel,
                      step < activeStep && isFormValid
                        ? styles.successStepLabel
                        : step === activeStep
                        ? styles.activeStepLabel
                        : styles.inactiveStepLabel,
                    ]}>
                    {step}
                  </Text>
                </View>

                {index < 4 && (
                  <View
                    style={[
                      styles.line(lineLength),
                      step < activeStep && isFormValid
                        ? styles.successLine
                        : styles.inactiveLine,
                    ]}
                  />
                )}
              </View>
            ))}
          </View>

          {/* Step 1: Form */}
          <View style={styles.formCard}>
            {/* "Previous" Label with Left Arrow */}
            {activeStep > 1 && (
              <TouchableOpacity
                style={styles.previousLabel}
                onPress={() => setActiveStep(activeStep - 1)}>
                <Ionicons
                  name="arrow-back"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.previousText}> Previous</Text>
              </TouchableOpacity>
            )}
            {/* Step 1 */}
            {activeStep === 1 && (
              <>
                {/* Username */}
                <Controller
                  control={control}
                  name="username"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Enter Username"
                      label="* Username"
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        setFormData({...formData, username: text});
                      }}
                      helperText={errors.username?.message}
                      error={!!errors.username}
                    />
                  )}
                />

                {/* Password */}
                <Controller
                  control={control}
                  name="password"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Enter Password"
                      label="* Password"
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        setFormData({...formData, password: text});
                      }}
                      isSecure={true}
                      helperText={errors.password?.message}
                      error={!!errors.password}
                    />
                  )}
                />

                {/* Confirm Password */}
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Confirm Password"
                      label="* Confirm Password"
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        setFormData({...formData, confirmPassword: text});
                      }}
                      isSecure={true}
                      helperText={errors.confirmPassword?.message}
                      error={!!errors.confirmPassword}
                    />
                  )}
                />
              </>
            )}

            {/*  Step 2 */}
            {activeStep === 2 && (
              <>
                {/* Business Phone Number */}
                <Controller
                  control={control}
                  name="businessPhoneNumber"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Enter Business Phone Number"
                      label="* Business Phone Number"
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        setFormData({...formData, businessPhoneNumber: text});
                      }}
                      keyboardType="phone-pad"
                      helperText={errors.businessPhoneNumber?.message}
                      error={!!errors.businessPhoneNumber}
                    />
                  )}
                />

                {/* Office Address */}
                <Controller
                  control={control}
                  name="officeAddress"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Enter Office Address"
                      label="* Office Address"
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        setFormData({...formData, officeAddress: text});
                      }}
                      helperText={errors.officeAddress?.message}
                      error={!!errors.officeAddress}
                    />
                  )}
                />

                {/* Business Type */}
                <Controller
                  control={control}
                  name="businessType"
                  render={({field: {onChange, value}}) => (
                    <>
                      <Text style={styles.businessTypeLabel}>
                        * Business Type
                      </Text>
                      <RadioButtonComponent
                        radioButtons={businessTypeOptions}
                        selectedId={value}
                        onRadioPress={onChange}
                      />
                      {errors.businessType && (
                        <Text style={styles.errorText}>
                          {errors.businessType?.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </>
            )}
            {/* Step 3 */}
            {activeStep === 3 && (
              <>
                {/* Full Name */}
                <Controller
                  control={control}
                  name="fullName"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Enter Full Name"
                      label="* Full Name"
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        setFormData({...formData, fullName: text});
                      }}
                      helperText={errors.fullName?.message}
                      error={!!errors.fullName}
                    />
                  )}
                />

                {/* ID Card Number */}
                <Controller
                  control={control}
                  name="idCardNumber"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Enter ID Card Number"
                      label="* ID Card Number"
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        setFormData({...formData, idCardNumber: text});
                      }}
                      keyboardType="numeric"
                      helperText={errors.idCardNumber?.message}
                      error={!!errors.idCardNumber}
                    />
                  )}
                />

                {/* Email */}
                <Controller
                  control={control}
                  name="email"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Enter Email"
                      label="* Email"
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        setFormData({...formData, email: text});
                      }}
                      keyboardType="email-address"
                      helperText={errors.email?.message}
                      error={!!errors.email}
                    />
                  )}
                />
              </>
            )}
            {/* Step 4 */}
            {activeStep === 4 && (
              <>
                {/* Bank Selection */}
                <Controller
                  control={control}
                  name="bank"
                  render={({field: {onChange, value}}) => (
                    <DropDownPicker
                      open={bankListOpen}
                      value={value || chooseBank} // Bind to value or local chooseBank state
                      items={bankList}
                      setOpen={setBankListOpen}
                      setValue={callback => {
                        const selectedValue = callback();
                        setChooseBank(selectedValue); // Update local state
                        onChange(selectedValue); // Update the form's state
                        setFormData({...formData, bank: selectedValue}); // Update formData
                      }}
                      setItems={setBankList}
                      placeholder="Select your bank"
                      containerStyle={{zIndex: 5000}} // To ensure dropdown appears on top of other elements
                    />
                  )}
                />
                {/* Bank Account Name */}
                <Controller
                  control={control}
                  name="bankAccountName"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Enter Bank Account Name"
                      label="* Bank Account Name"
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        setFormData({...formData, bankAccountName: text});
                      }}
                      helperText={errors.bankAccountName?.message}
                      error={!!errors.bankAccountName}
                    />
                  )}
                />

                {/* Bank Account Number */}
                <Controller
                  control={control}
                  name="bankAccountNumber"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Enter Bank Account Number"
                      label="* Bank Account Number"
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        setFormData({...formData, bankAccountNumber: text});
                      }}
                      keyboardType="numeric"
                      helperText={errors.bankAccountNumber?.message}
                      error={!!errors.bankAccountNumber}
                    />
                  )}
                />
              </>
            )}

            {/* Step 5*/}
            {activeStep === 5 && (
              <View style={styles.imageUploadContainer}>
                <Text style={[CommonStyles.infoLabel, {marginLeft: -10}]}>
                  * Logo
                </Text>
                <ImagePickerFrame
                  onPress={() => handleImageUpload('logo')}
                  imageUri={formData?.logo?.uri}
                  label="Upload Logo"
                />
                <Text style={[CommonStyles.infoLabel, {marginLeft: -10}]}>
                  * ID Card Front
                </Text>
                <ImagePickerFrame
                  onPress={() => handleImageUpload('idFront')}
                  imageUri={formData.idFront.uri}
                  label="Upload ID Front"
                />
                <Text style={[CommonStyles.infoLabel, {marginLeft: -10}]}>
                  * ID Card Back
                </Text>
                <ImagePickerFrame
                  onPress={() => handleImageUpload('idBack')}
                  imageUri={formData.idBack.uri}
                  label="Upload ID Back"
                />
                <Text style={[CommonStyles.infoLabel, {marginLeft: -10}]}>
                  * Bank Book Copy
                </Text>
                <ImagePickerFrame
                  onPress={() => handleImageUpload('bankBook')}
                  imageUri={formData.bankBook.uri}
                  label="Upload Bank Book"
                />
                <Controller
                  control={control}
                  name="terms"
                  render={({field: {onChange, value}}) => (
                    <CheckBoxComponent
                      label={'Accept Terms & Conditions'}
                      isChecked={checkTerms}
                      onToggle={() => {
                        setCheckTerms(!checkTerms);
                        onChange(!checkTerms); // Update form state
                      }}
                      isSwap={true}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="confirmation"
                  render={({field: {onChange, value}}) => (
                    <CheckBoxComponent
                      label={
                        'I confirm that above documents and information are correct and complete'
                      }
                      isChecked={checkConfirm}
                      onToggle={() => {
                        setCheckConfirm(!checkConfirm);
                        onChange(!checkConfirm); // Update form state
                      }}
                      isSwap={true}
                    />
                  )}
                />
              </View>
            )}

            {/* Next Button */}
            <DefaultButtonComponent
              title="Next"
              backgroundColor={theme.colors.primary}
              onPress={handleNext}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles for the stepper, form, and other UI elements
const styles = {
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepSquare: size => ({
    width: size,
    height: size,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  }),
  activeStepSquare: {
    backgroundColor: theme.colors.primary,
  },
  successStepSquare: {
    backgroundColor: theme.colors.success,
  },
  inactiveStepSquare: {
    backgroundColor: '#ccc',
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeStepLabel: {
    color: '#fff',
  },
  successStepLabel: {
    color: '#fff',
  },
  inactiveStepLabel: {
    color: '#333',
  },
  line: length => ({
    width: length,
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  }),
  successLine: {
    backgroundColor: theme.colors.success,
  },
  inactiveLine: {
    backgroundColor: '#ccc',
  },
  formCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 40,
  },
  nextButton: {
    marginTop: 10,
    backgroundColor: theme.colors.primary,
  },
  previousLabel: {
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  previousText: {
    color: theme.colors.primary, // Style as per your theme
    fontSize: 16,
    fontWeight: 'bold',
  },
  businessTypeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  // image upload
  imageUploadContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 8,
  },
  uploadLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 16,
    color: theme.colors.primary,
    marginVertical: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 5,
    resizeMode: 'cover',
  },
  // image frame
  frame: {
    width: 250,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: theme.colors.textDark,
    borderRadius: 10,
    justifyContent: 'center',
    borderStyle: 'dotted',
    alignItems: 'center',
    backgroundColor: theme.colors.textLightGray, // Frame background color
    marginVertical: 10, // Space between frames
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: theme.colors.textDark,
    marginTop: 5,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
};
