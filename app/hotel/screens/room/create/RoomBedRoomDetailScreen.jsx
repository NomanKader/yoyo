import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import { CommonStyles } from '../../../style/CommonStyles';
import CheckBoxComponent from '../../../components/Checkbox/CheckboxComponent';
import { GetAllAmenities } from '../../../services/FacilitiesAndAmentitiesService';

export default function RoomBedroomDetailScreen({ navigation }) {
  const [features, setFeatures] = useState({});
  const [featureOptions, setFeatureOptions] = useState([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await GetAllAmenities({ languageId: 1, hotelId: 1 });
        if (response) {
          const bedroomFeatures = response?.data?.data?.filter(
            item => item.amenityTypeName === 'BedRoom'
          );

          const initialFeatures = {};
          const formattedOptions = bedroomFeatures.map(item => {
            initialFeatures[item.id] = false;
            return { label: item.amenityName, value: item.id };
          });

          console.log("BedRoom Features:", formattedOptions);
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

  const toggleAll = () => {
    const newValue = !areAllSelected;
    const updated = {};
    for (const key in features) {
      updated[key] = newValue;
    }
    setFeatures(updated);
  };

  const toggleFeature = (featureId) => {
    setFeatures((prev) => ({
      ...prev,
      [featureId]: !prev[featureId],
    }));
  };

  return (
    <SafeAreaView style={CommonStyles.scrollViewContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <StepAppBarComponent title="Add bedroom details" currentStep="4" navigation={navigation} />
          <Text style={CommonStyles.header}>Add bedroom details</Text>
          <Text style={CommonStyles.subHeader}>
            Please select all the room features available in this category.
          </Text>

          <View style={CommonStyles.room.inputContainer}>
            <CheckBoxComponent
              selectAll={true}
              selectAllLabel="Select All"
              isAllSelected={areAllSelected}
              onToggleAll={toggleAll}
            />

            {featureOptions.map((feature) => (
              <CheckBoxComponent
                key={feature.value}
                label={feature.label}
                isChecked={features[feature.value]}
                onToggle={() => toggleFeature(feature.value)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <DefaultButtonComponent
            title="Proceed"
            backgroundColor={theme.colors.primary}
            onPress={() =>
              navigation.navigate('AppStack', {
                screen: 'RoomViewScreen',
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
