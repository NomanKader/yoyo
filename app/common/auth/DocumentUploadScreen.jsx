import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {pick} from '@react-native-documents/picker';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import ProgressBar from '../components/ProgessBarComponent';
import paymentSuccessIcon from '../assets/paymentSuccessIcon.png';
import theme from '../../apartment/style/colors';
import {RegisterContext} from '../utils/RegisterProvider';
import {Register} from '../service/AuthService';
import CustomAlert from '../alert/CustomAlert';
import {
  FileUpload,
  ImageUpload,
  RemoveImage,
} from '../service/ImageFileService';

const screenWidth = Dimensions.get('window').width;
const BASE_IMAGE_URL = 'https://www.12zay.com/easyclickup/upload/hotel/images/';

export default function DocumentUploadScreen({navigation}) {
  const {registerData, updateRegisterData, resetRegisterData} =
    useContext(RegisterContext);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState({});

  useEffect(() => {
    const onBackPress = () => (loading ? true : false);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => backHandler.remove();
  }, [loading]);

  const handleImagePick = async key => {
    if (loading) return;

    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      });

      const fileName = image.path.split('/').pop();
      const fileType = fileName.split('.').pop();

      const formData = new FormData();
      formData.append('myFile', {
        uri: image.path,
        type: `image/${fileType}`,
        name: fileName,
      });
      formData.append('usage', 0);

      const response = await ImageUpload(formData);
      if (response?.success) {
        updateRegisterData(key, response.data?.name);
      } else {
        setErrorMessage(response.message || 'Image upload failed');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setErrorMessage('Image selection or upload failed');
      setAlertVisible(true);
    }
  };

  const handleImageDelete = async key => {
    try {
      const response = await RemoveImage(registerData[key]);
      if (response?.success) {
        console.log('Image removed:', response);
        updateRegisterData(key, '');
      } else {
        console.warn('Failed to remove image:', response.message);
      }
    } catch (error) {
      console.error('Image delete error:', error);
    }
  };

  // const handleFilePick = async () => {
  //   if (loading) return;
  //   try {
  //     const res = await pick({
  //       allowMultiSelection: false,
  //       type: [
  //         'application/pdf',
  //         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //       ],
  //     });
  //     updateRegisterData('documents', res);
  //   } catch (err) {
  //     if (err.code !== 'DOCUMENT_PICKER_CANCELED') console.warn(err);
  //   }
  // };

  const handleFilePick = async () => {
    if (loading) return;

    try {
      const res = await pick({
        allowMultiSelection: false,
        type: [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
      });

      if (res && res.length > 0) {
        const file = res[0];
        const fileName = file.name;
        const fileType = fileName.split('.').pop();

        const formData = new FormData();
        formData.append('myFile', {
          uri: file.uri,
          name: fileName,
          type: `application/${fileType}`,
        });
        formData.append('usage', 0);

        const response = await FileUpload(formData);

        if (response?.success) {
          updateRegisterData('documents', [response.data?.name]); // save backend path
        } else {
          setErrorMessage(response.message || 'File upload failed');
          setAlertVisible(true);
        }
      }
    } catch (err) {
      if (err.code !== 'DOCUMENT_PICKER_CANCELED') {
        console.warn(err);
        setErrorMessage('File selection or upload failed');
        setAlertVisible(true);
      }
    }
  };
  const register = async () => {
    console.log('Register Data:', JSON.stringify(registerData));
    const payload = {
      ...registerData,
      documents: registerData.documents?.map(doc => doc.name) || [],
    };

    try {
      setLoading(true);
      const response = await Register(payload);
      if (response.success) {
        navigation.navigate('HotelTabStack', {
          screen: 'SuccessScreen',
          params: {
            header: 'Registered Successfully',
            subheader: '',
            nextScreen: 'Login',
            icon: paymentSuccessIcon,
            isShowingIllustration: true,
            buttonText: 'Back to Login',
            color: theme.colors.primary,
          },
        });
        setTimeout(() => {
          resetRegisterData();
        }, 300);
      } else {
        setErrorMessage(response.message || 'Registration failed');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed');
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };
  const handleFileDelete = async () => {
    try {
      const filePath = registerData.documents?.[0];
      const response = await RemoveImage(filePath);
      if (response?.success) {
        updateRegisterData('documents', []);
      }
    } catch (err) {
      console.warn('File delete failed:', err);
    }
  };

  const isValid =
    (registerData.type !== 2 ? registerData.logo : true) &&
    registerData.propertyPhoto;

  const renderImageBox = (label, key) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.uploadBox}>
        {registerData[key] ? (
          <>
            {imageLoadingState[key] ? (
              <View style={styles.loadingOverlayAbsolute}>
                <Text style={styles.loadingTextOnly}>Loading...</Text>
              </View>
            ) : null}
            <Image
              source={{uri: `${BASE_IMAGE_URL}${registerData[key]}`}}
              style={styles.preview}
              onLoadStart={() =>
                setImageLoadingState(prev => ({...prev, [key]: true}))
              }
              onLoadEnd={() =>
                setImageLoadingState(prev => ({...prev, [key]: false}))
              }
            />
            <TouchableOpacity onPress={() => handleImageDelete(key)}>
              <Text style={styles.deleteText}>Delete Image</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => handleImagePick(key)}>
            <Image
              source={require('../assets/plusIcon.png')}
              style={styles.plusIcon}
            />
            <Text style={styles.uploadText}>
              Choose Image{'\n'}( Max. size 5 MB )
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title="Something went wrong"
        message={errorMessage}
        onClose={() => setAlertVisible(false)}
      />
      <HeaderComponent
        title="Hotel Pictures and Documents"
        onPress={loading ? null : () => navigation.goBack()}
      />
      <ProgressBar currentStep={4} totalSteps={5} />

      <Text style={styles.subtitle}>
        Please upload your hotel logo and picture, so that customers can see you
        better!
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        {registerData.type !== 2 && renderImageBox('Hotel Logo', 'logo')}
        {renderImageBox('Property', 'propertyPhoto')}
        <Text style={styles.label}>Documents (Optional)</Text>
        {renderImageBox('ID Card - Front', 'idCardFront')}
        {renderImageBox('ID Card - Back', 'idCardBack')}

        <Text style={styles.subLabel}>Other Official Documents</Text>
        <View style={styles.uploadBox}>
          {registerData.documents?.length > 0 ? (
            <>
              <Text style={styles.fileName}>
                {`${BASE_IMAGE_URL}${registerData?.documents?.[0]}`
                  .split('/')
                  .pop()}
              </Text>

              <TouchableOpacity onPress={handleFileDelete}>
                <Text style={styles.deleteText}>Delete File</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={handleFilePick}
              style={styles.uploadContent}>
              <Image
                source={require('../assets/plusIcon.png')}
                style={styles.plusIcon}
              />
              <Text style={styles.uploadText}>
                Choose Files{'\n'}Allowed File Types: .pdf, .docx{'\n'}Max.
                size: 10 MB
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        disabled={!isValid || loading}
        style={[styles.button, (!isValid || loading) && styles.buttonDisabled]}
        onPress={register}>
        {loading ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{marginRight: 8}}
            />
            <Text style={styles.buttonText}>Submitting...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Submitting...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: screenWidth * 0.06,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  loadingOverlayAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)', // optional dim background
    borderRadius: 6,
  },

  loadingTextOnly: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 15,
  },
  subLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 6,
  },
  uploadBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  uploadText: {
    textAlign: 'center',
    marginTop: 8,
    color: '#333',
    fontSize: 13,
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginBottom: 8,
  },
  fileName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  deleteText: {
    color: 'red',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007bff',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  uploadContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
});
