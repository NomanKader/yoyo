import * as yup from 'yup';

export const _RegisterValidationSchema = (activeStep) => {
  return yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long'),
    password: yup
      .string()
      .required('Password is required')
      .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
      .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
      .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
      .matches(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one special character'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    businessPhoneNumber: activeStep === 2
      ? yup
          .string()
          .required('Business phone number is required')
          .matches(/^[0-9]+$/, 'Business phone number must contain only digits')
      : yup.string(), // No validation if not on step 2
    officeAddress: activeStep === 2
      ? yup.string().required('Office address is required')
      : yup.string(),
  });
};
