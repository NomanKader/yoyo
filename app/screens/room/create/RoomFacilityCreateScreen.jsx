import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import { CommonStyles } from '../../../style/CommonStyles';
import TextInputComponent from '../../../components/TextInput/TextInputComponent';
import TypoPriceComponent from '../../../components/Typography/TypoPriceComponent';
import DropdownPickerComponent from '../../../components/Dropdown/DropdownPickerComponent';
import DividerComponent from '../../../components/Divider/DividerComponent';

const PRICE_PER_EXTRA_BED = 30000; // Example price in MMK

export default function RoomFacilityCreateScreen({ route, navigation }) {
  const { breakfastIncluded } = route.params;
  const [open, setOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [extraBedCount, setExtraBedCount] = useState(1);
  const [facilityOptions, setFacilityOptions] = useState([
    { label: 'Wifi', value: 'wifi' },
    { label: 'Wine Bottle', value: 'wine_bottle' },
    { label: 'Gym Access', value: 'gym_access' },
    { label: 'Swimming Pool Access', value: 'swimming_pool_access' },
    { label: 'Extra Bed', value: 'extra_bed' },
  ]);

  // Calculate total price for extra beds
  const calculateTotalPrice = () => {
    const count = parseInt(extraBedCount, 10);
    return isNaN(count) || count <= 0 ? 0 : count * PRICE_PER_EXTRA_BED;
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
            currentStep="2"
            navigation={navigation}
          />
          <Text style={CommonStyles.header}>Add-on price Facility</Text>
          <Text style={CommonStyles.subHeader}>Add facility</Text>
          <View style={CommonStyles.room.inputContainer}>
            <Text style={styles.label}>Name of Facility</Text>
            <DropdownPickerComponent
              open={open}
              value={selectedFacilities}
              items={facilityOptions}
              setOpen={setOpen}
              setValue={setSelectedFacilities}
              setItems={setFacilityOptions}
              multiple={true}
              placeholder="Select facilities"
              style={pickerSelectStyles.input}
              dropDownContainerStyle={pickerSelectStyles.dropdown}
            />
          </View>
          {breakfastIncluded && (
            <>
              <TypoPriceComponent label="Breakfast" price="30,000 MMK" />
              <View style={CommonStyles.dividerView}>
                <DividerComponent />
              </View>
            </>
          )}
          {selectedFacilities.map(facility =>
            facility !== 'extra_bed' ? (
              <TypoPriceComponent
                key={facility}
                label={
                  facilityOptions.find(
                    facilityOption => facilityOption.value === facility,
                  ).label
                }
                price="30,000 MMK"
              />
            ) : (
              <View key={facility}>
                {/* Updated TypoPriceComponent for Extra Bed */}
                <TypoPriceComponent
                  label="Extra Bed"
                  price={`${calculateTotalPrice().toLocaleString()} MMK`}
                />
                <View style={CommonStyles.dividerView}>
                  <DividerComponent />
                </View>
                <View style={CommonStyles.room.inputContainer}>
                  <TextInputComponent
                    placeholder="Enter number of extra beds"
                    value={extraBedCount}
                    onChangeText={setExtraBedCount}
                    label="How many extra beds are allowed?"
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            ),
          )}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <DefaultButtonComponent
            title="Proceed"
            backgroundColor={theme.colors.primary}
            onPress={() =>
              navigation.navigate('AppStack', { screen: 'RoomBasicFeatureScreen' })
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
    backgroundColor: 'white'
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    marginTop: '10%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    marginBottom: 20,
  },
  dropdown: {
    borderColor: '#ccc',
  },
});
