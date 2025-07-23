import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GetAllAmenities} from '../../../services/FacilitiesAndAmentitiesService';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import {CommonStyles} from '../../../style/CommonStyles';
import CheckBoxComponent from '../../../components/Checkbox/CheckboxComponent';

export default function RoomBasicFeatureScreen({navigation}) {
  // const [features, setFeatures] = useState({
  //   airConditioner: false,
  //   flatscreenTV: false,
  //   wifiConnection: false,
  //   soundproofing: false,
  //   poolView: false,
  //   ensuiteBathroom: false,
  //   cityView: false,
  //   refrigerator: false,
  // });

  // const featureOptions = [
  //   {label: 'Air Conditioner', value: 'airConditioner'},
  //   {label: 'Flatscreen TV', value: 'flatscreenTV'},
  //   {label: 'Wifi-Connection', value: 'wifiConnection'},
  //   {label: 'Soundproofing', value: 'soundproofing'},
  //   {label: 'Pool view', value: 'poolView'},
  //   {label: 'Ensuite bathroom', value: 'ensuiteBathroom'},
  //   {label: 'City view', value: 'cityView'},
  //   {label: 'Refrigerator', value: 'refrigerator'},
  // ];
  const [featureOptions, setFeatureOptions] = useState([]);
  const [features, setFeatures] = useState({});
useEffect(() => {
  const fetchAmenities = async () => {
    try {
      const response = await GetAllAmenities({languageId:1,hotelId:1});
      if (response) {
        const basicFeatures = response?.data?.data?.filter(
          item => item.amenityTypeName === 'Basic Feature'
        );

        const initialFeatures = {};
        const formattedOptions = basicFeatures.map(item => {
          initialFeatures[item.id] = false;
          return { label: item.amenityName, value: item.id };
        });

        console.log("Basic Features:", formattedOptions); // ✅ Add this
        setFeatureOptions(formattedOptions);
        setFeatures(initialFeatures);
      }
    } catch (error) {
      console.error('Error fetching amenities:', error);
    }
  };

  fetchAmenities();
}, []);


  const areAllSelected = Object.values(features).every(Boolean);

  const toggleFeature = featureId => {
    setFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId],
    }));
  };

  const toggleAll = () => {
    const newState = {};
    for (const key in features) {
      newState[key] = !areAllSelected;
    }
    setFeatures(newState);
  };

  return (
    <SafeAreaView style={CommonStyles.scrollViewContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <StepAppBarComponent
            title="Some Screen"
            currentStep="3"
            navigation={navigation}
          />
          <Text style={CommonStyles.header}>Add basic features</Text>
          <Text style={CommonStyles.subHeader}>
            Please select features that are available in this room category
          </Text>
          {/* Select All checkbox */}
          <CheckBoxComponent
            selectAll={true}
            selectAllLabel="Select All"
            isAllSelected={areAllSelected}
            onToggleAll={toggleAll}
          />

          {/* Dynamic Feature Checkboxes */}
          {featureOptions.map(feature => (
            <CheckBoxComponent
              key={feature.value}
              label={feature.label}
              isChecked={features[feature.value]}
              onToggle={() => toggleFeature(feature.value)}
            />
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <DefaultButtonComponent
            title="Proceed"
            backgroundColor={theme.colors.primary}
            onPress={() =>
              navigation.navigate('AppStack', {
                screen: 'RoomBedroomDetailScreen',
              })
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  buttonContainer: {
    backgroundColor: 'white',
  },
});
