import React, { useState, useEffect, useContext } from 'react';
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
import { RoomCreationDataContext } from '../../../context/RoomCreationContext';
import { useRoomData } from '../../../context/CreatCategoryContext';

export default function RoomBedroomDetailScreen({ navigation }) {
  const [features, setFeatures] = useState({});
  const [featureOptions, setFeatureOptions] = useState([]);
  const { roomCreationData } = useContext(RoomCreationDataContext);
  const { roomData, updateRoomData } = useRoomData()

  // 1) When building options, keep both ids
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const bedroomFeatures = roomCreationData.amenities?.filter(
          item => item.amenityTypeName === 'BedRoom'
        ) ?? [];

        const initialFeatures = {};
        const formattedOptions = bedroomFeatures.map(item => {
          initialFeatures[item.id] = false; // checkbox uses amenity "id"
          return {
            label: item.amenityName,
            value: item.id,                 // amenity id (for UI state)
            toHotelId: item.amenityToHotelId, // <-- we need this to save
          };
        });

        setFeatureOptions(formattedOptions);
        setFeatures(initialFeatures);
      } catch (error) {
        console.error('Error fetching amenities:', error);
      }
    };

    fetchAmenities();
  }, []);


  // 2) Merge Bedroom picks into existing amenities (don’t wipe Basic Feature)
  useEffect(() => {
    if (!featureOptions.length) return;

    // Selected amenity *ids* on this screen
    const selectedIds = Object.keys(features)
      .filter(k => features[k])
      .map(Number);

    // Map amenity id -> amenityToHotelId
    const idToHotelId = new Map(featureOptions.map(o => [o.value, o.toHotelId]));

    // Convert selected amenity ids to amenityToHotelIds
    const selectedHotelIds = selectedIds
      .map(id => idToHotelId.get(id))
      .filter(id => id != null);

    // All Bedroom amenityToHotelIds (so we can replace only this subset)
    const bedroomHotelIds = new Set(featureOptions.map(o => o.toHotelId));

    updateRoomData(prev => {
      const prevAmenities = Array.isArray(prev.amenities) ? prev.amenities : [];

      // keep everything NOT from Bedroom
      const kept = prevAmenities.filter(a => !bedroomHotelIds.has(a.amenityToHotelId));

      // add current Bedroom selections (de-dup)
      const add = Array.from(new Set(selectedHotelIds)).map(id => ({ amenityToHotelId: id }));

      return { ...prev, amenities: [...kept, ...add] };
    });
  }, [features, featureOptions, updateRoomData]);


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
            onPress={() => {
              navigation.navigate('AppStack', {
                screen: 'RoomViewScreen',
              })
              console.log("erre", roomData)
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
