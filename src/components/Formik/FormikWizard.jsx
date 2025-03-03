// src/components/Formik/FormikWizard.js
import React, {useState, useEffect} from 'react';
import {Button, View} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';
import DefaultButtonComponent from '../Button/DefaultButtonComponent';
import theme from '../../styles/colors';
import {CommonStyles} from '../../styles/CommonStyles';
import BGCardComponent from '../Card/BGCardComponent';

const FormikWizard = ({steps, initialValues, onComplete}) => {
  const {t} = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialValues);
  const [deviceId, setDeviceId] = useState('');

  const isLastStep = currentStep === steps.length - 1;

  // Fetch the device ID on mount
  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = DeviceInfo.getUniqueIdSync();
      setDeviceId(id);
    };
    fetchDeviceId();
  }, []);

  const handleNextStep = values => {
    console.log('NextStep');
    const updatedFormData = {...formData, ...values, deviceId};
    setFormData(updatedFormData);

    if (isLastStep) {
      onComplete(updatedFormData);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const StepComponent = steps[currentStep].component;
  const validationSchema = steps[currentStep].validationSchema;

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      validateOnMount={false}
      validateOnBlur={true} // Disable validation on blur
      validateOnChange={false}
      onSubmit={handleNextStep}>
      {formikProps => (
        <KeyboardAwareScrollView extraScrollHeight={20} enableOnAndroid={true}>
          <BGCardComponent padding={0} otherStyle={{paddingBottom: 140}}>
            <StepComponent formikProps={formikProps} formData={formData} />

            {!isLastStep ? (
              <View style={CommonStyles.buttonHolder}>
                <DefaultButtonComponent
                  title={isLastStep ? t('submit') : t('next')}
                  backgroundColor={theme.colors.primary}
                  onPress={formikProps.handleSubmit}
                />
              </View>
            ) : (
              <View style={CommonStyles.buttonHolder}>
                <DefaultButtonComponent
                  title={isLastStep ? t('submit') : t('next')}
                  backgroundColor={theme.colors.primary}
                  onPress={formikProps.handleSubmit}
                />
              </View>
            )}
          </BGCardComponent>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default FormikWizard;
