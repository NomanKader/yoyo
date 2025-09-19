import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAllAmenities } from '../../../services/FacilitiesAndAmentitiesService';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import { CommonStyles } from '../../../style/CommonStyles';
import CheckBoxComponent from '../../../components/Checkbox/CheckboxComponent';
import { RoomCreationDataContext } from '../../../context/RoomCreationContext';
import { useRoomData } from '../../../context/CreatCategoryContext';

export default function RoomBasicFeatureScreen({ navigation }) {
  const [featureOptions, setFeatureOptions] = useState([]);
  const { roomData, updateRoomData } = useRoomData()
  const [features, setFeatures] = useState({});
  const { roomCreationData } = useContext(RoomCreationDataContext);
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const basicFeatures = roomCreationData.amenities?.filter(
          item => item.amenityTypeName === 'Basic Feature'
        );

        const initialFeatures = {};
        const formattedOptions = basicFeatures.map(item => {
          initialFeatures[item.id] = false;
          return {
            label: item.amenityName, value: item.id, toHotelId: item.amenityToHotelId, // <-- we need this to save
          };
        });

        console.log("Basic Features:", formattedOptions); // ✅ Add this
        setFeatureOptions(formattedOptions);
        setFeatures(initialFeatures);

      } catch (error) {
        console.error('Error fetching amenities:', error);
      }
    };

    fetchAmenities();
  }, []);

  useEffect(() => {
    const selectedIds = Object.keys(features)
      .filter((k) => features[k])     // only checked ones
      .map(Number);

    const idToHotelId = new Map(featureOptions.map(o => [o.value, o.toHotelId]));

    const selectedHotelIds = selectedIds
      .map(id => idToHotelId.get(id))
      .filter(id => id != null);

    updateRoomData({
      amenities: selectedHotelIds.map((amenityToHotelId) => ({ amenityToHotelId: amenityToHotelId })),
    });
  }, [features, updateRoomData]);

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
          contentContainerStyle={{ flexGrow: 1 }}
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
            onPress={() => {
              navigation.navigate('AppStack', {
                screen: 'RoomBedroomDetailScreen',
              })
              console.log("ere", roomData)
            }
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
