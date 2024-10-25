import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import { CommonStyles } from '../../../style/CommonStyles';
import RadioButtonComponent from '../../../components/Radio/RadioButtonComponent';

const RoomViewScreen = ({ navigation }) => {
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const radioButtons = [
    { id: '1', label: 'Pool View', value: 'pool_view' },
    { id: '2', label: 'Landmark View', value: 'landmark_view' },
    { id: '3', label: 'Mountain View', value: 'mountain_view' },
    { id: '4', label: 'City View', value: 'city_view' },
  ];

  const handleRadioPress = (selectedId) => {
    setSelectedOptionId(selectedId);
  };

  return (
    <SafeAreaView style={CommonStyles.scrollViewContainer}>
      <StepAppBarComponent title="Room View Screen" currentStep={6} navigation={navigation} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={CommonStyles.header}>Room View</Text>
        <Text style={CommonStyles.subHeader}>Please select all the room features available in this category.</Text>
        <View style={styles.radioContainer}>
        <RadioButtonComponent
          radioButtons={radioButtons}
          selectedId={selectedOptionId}
          onRadioPress={handleRadioPress}
        />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <DefaultButtonComponent
          title="Proceed"
          backgroundColor={theme.colors.primary}
          onPress={() => {
            navigation.navigate('AppStack',{screen:'RoomRuleScreen'})
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  radioContainer:{
    marginTop:20
  }
});

export default RoomViewScreen;
