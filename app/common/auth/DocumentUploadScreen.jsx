import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, StyleSheet, Dimensions,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { pick } from '@react-native-documents/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import ProgressBar from '../components/ProgessBarComponent';
import paymentSuccessIcon from '../assets/paymentSuccessIcon.png';
import theme from '../../apartment/style/colors';
const screenWidth = Dimensions.get('window').width;

export default function DocumentUploadScreen({ navigation }) {
  const [hotelLogo, setHotelLogo] = useState(null);
  const [propertyImage, setPropertyImage] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [officialDoc, setOfficialDoc] = useState(null);

  const handleImagePick = async (setter) => {
    const image = await ImagePicker.openPicker({ mediaType: 'photo', cropping: true });
    setter(image);
  };

  const handleFilePick = async () => {
    try {
      const res = await pick({
        allowMultiSelection: false,
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], // pdf, docx
      });
      setOfficialDoc(res[0]);
    } catch (err) {
      if (err.code !== 'DOCUMENT_PICKER_CANCELED') {
        console.warn(err);
      }
    }
  };
  

  const isValid = hotelLogo && propertyImage;

  return (
    <View style={styles.container}>
      <HeaderComponent title="Hotel Pictures and Documents" navigation={navigation} />
      <ProgressBar currentStep={4} totalSteps={5} />

      <Text style={styles.subtitle}>
        Please upload your hotel logo and picture, so that customers can see you better!
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Hotel Logo */}
      <Text style={styles.label}>Hotel Logo</Text>
      <View style={styles.uploadBox}>
        {hotelLogo ? (
          <>
            <Image source={{ uri: hotelLogo.path }} style={styles.preview} />
            <TouchableOpacity onPress={() => setHotelLogo(null)}>
              <Text style={styles.deleteText}>Delete Image</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => handleImagePick(setHotelLogo)}>
            <Image source={require('../assets/plusIcon.png')} style={{ width: 90, height: 90 }} />
            <Text style={styles.uploadText}>Choose Image{"\n"}( Max. size 5 MB )</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Property Image */}
      <Text style={styles.label}>Property</Text>
      <View style={styles.uploadBox}>
        {propertyImage ? (
          <>
            <Image source={{ uri: propertyImage.path }} style={styles.preview} />
            <TouchableOpacity onPress={() => setPropertyImage(null)}>
              <Text style={styles.deleteText}>Delete Image</Text>
            </TouchableOpacity>
          </>
        ) : (
            <TouchableOpacity onPress={() => handleImagePick(setPropertyImage)}>
            <Image source={require('../assets/plusIcon.png')} style={{ width: 90, height: 90 }} />
            <Text style={styles.uploadText}>Choose Image{"\n"}( Max. size 5 MB )</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ID Card */}
      <Text style={styles.label}>ID Card</Text>
      <View style={styles.uploadBox}>
        {idCard ? (
          <>
            <Image source={{ uri: idCard.path }} style={styles.preview} />
            <TouchableOpacity onPress={() => setIdCard(null)}>
              <Text style={styles.deleteText}>Delete Image</Text>
            </TouchableOpacity>
          </>
        ) : (
            <TouchableOpacity onPress={() => handleImagePick(setIdCard)}>
            <Image source={require('../assets/plusIcon.png')} style={{ width: 90, height: 90 }} />
            <Text style={styles.uploadText}>Choose Image{"\n"}( Max. size 5 MB )</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Other Documents */}
      <Text style={styles.label}>Other Official Documents</Text>
      <View style={styles.uploadBox}>
        {officialDoc ? (
          <>
            <Text style={styles.fileName}>{officialDoc.name}</Text>
            <TouchableOpacity onPress={() => setOfficialDoc(null)}>
              <Text style={styles.deleteText}>Delete File</Text>
            </TouchableOpacity>
          </>
        ) : (
<TouchableOpacity onPress={handleFilePick} style={styles.uploadContent}>
  <Image source={require('../assets/plusIcon.png')} style={styles.plusIcon} />
  <Text style={styles.uploadText}>
    Choose Files{"\n"}Allowed File Types: .pdf, .docx{"\n"}Max. size: 10 MB
  </Text>
</TouchableOpacity>

        )}
      </View>
        </ScrollView>
      {/* Continue */}
      <TouchableOpacity
        disabled={!isValid}
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={() => {
            navigation.navigate('HotelAppStack', {
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
          }}        
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 15,
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
  
});
