import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import { CommonStyles } from '../../../style/CommonStyles';
import CheckBoxComponent from '../../../components/Checkbox/CheckboxComponent';

export default function RoomBedroomDetailScreen({ navigation }) {
  const [features, setFeatures] = useState({
    wardrobe: false,
    handSanitiser: false,
    desk: false,
    seatingArea: false,
    diningArea: false,
    washingMachine: false,
    wheelchairAccessible: false,
    satelliteChannel: false,
  });

  const toggleFeature = (feature) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
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
          <Text style={CommonStyles.subHeader}>Please select all the room features available in this category.</Text>
          <View style={CommonStyles.room.inputContainer}>
            {Object.keys(features).map((featureKey) => (
              <CheckBoxComponent
                key={featureKey}
                label={featureKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                isChecked={features[featureKey]}
                onToggle={() => toggleFeature(featureKey)}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <DefaultButtonComponent
            title="Proceed"
            backgroundColor={theme.colors.primary}
            onPress={() => navigation.navigate('AppStack',{screen:'RoomView'})}
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
