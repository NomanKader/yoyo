import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import { CommonStyles } from '../../../style/CommonStyles';
import CheckBoxComponent from '../../../components/Checkbox/CheckboxComponent';

export default function RoomBasicFeatureScreen({ navigation }) {
  const [features, setFeatures] = useState({
    airConditioner: false,
    flatscreenTV: false,
    wifiConnection: false,
    soundproofing: false,
    poolView: false,
    ensuiteBathroom: false,
    cityView: false,
    refrigerator: false,
  });

  const featureOptions = [
    { label: 'Air Conditioner', value: 'airConditioner' },
    { label: 'Flatscreen TV', value: 'flatscreenTV' },
    { label: 'Wifi-Connection', value: 'wifiConnection' },
    { label: 'Soundproofing', value: 'soundproofing' },
    { label: 'Pool view', value: 'poolView' },
    { label: 'Ensuite bathroom', value: 'ensuiteBathroom' },
    { label: 'City view', value: 'cityView' },
    { label: 'Refrigerator', value: 'refrigerator' },
  ];

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
          <StepAppBarComponent title="Some Screen" currentStep="3" navigation={navigation} />
          <Text style={CommonStyles.header}>Add basic features</Text>
          <Text style={CommonStyles.subHeader}>Please select features that are available in this room category</Text>
          {featureOptions.map((feature) => (
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
            onPress={() => navigation.navigate('AppStack',{screen:'RoomBedroomDetailScreen'})}
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
