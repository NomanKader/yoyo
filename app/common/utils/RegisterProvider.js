import React, { createContext, useState } from 'react';

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    role: '',
    idCardNo: '',
    idCardFront: '',
    idCardBack: '',
    documents: [],
    type: 0,
    brandId: 0,
    otpToken: '',
    hotelName: '',
    hotelDescription: '',
    lat: 0,
    lng: 0,
    address: '',
    state: '',
    city: '',
    township: '',
    hotelPhoneNumbers: "",
    hotelEmail: '',
    logo: '',
  });

  const updateRegisterData = (key, value) => {
    setRegisterData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <RegisterContext.Provider value={{ registerData, updateRegisterData }}>
      {children}
    </RegisterContext.Provider>
  );
};
