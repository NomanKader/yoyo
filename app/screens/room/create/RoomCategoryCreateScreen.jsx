import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import { CommonStyles } from '../../../style/CommonStyles';
import TextInputComponent from '../../../components/TextInput/TextInputComponent';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';

export default function RoomCategoryCreateScreen({ navigation }) {
  const [categoryName, setCategoryName] = useState('');
  const [price, setPrice] = useState('');
  const [breakfastIncluded, setBreakfastIncluded] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={CommonStyles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <StepAppBarComponent title="Some Screen" currentStep="1" navigation={navigation} />
          <Text style={CommonStyles.header}>Create Room Category</Text>
          <Text style={CommonStyles.subHeader}>
            Add a new room to your category of hotels using this form
          </Text>
          <View style={CommonStyles.room.inputContainer}>
            <TextInputComponent
              placeholder="Enter category name"
              value={categoryName}
              onChangeText={setCategoryName}
              label="Name of Category"
              keyboardType="default"
            />
          </View>
          <View style={CommonStyles.room.inputContainer}>
            <TextInputComponent
              placeholder="Price of room"
              value={price}
              onChangeText={setPrice}
              label="Price of Room"
              keyboardType="numeric"
            />
          </View>
          <View style={CommonStyles.room.breakfastContainer}>
            <Text style={CommonStyles.room.breakfastLabel}>Breakfast included</Text>
            <CheckBox
              tintColors={{ true: theme.colors.primary, false: theme.colors.textGray }}
              value={breakfastIncluded}
              onValueChange={setBreakfastIncluded}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <DefaultButtonComponent
            title="Proceed"
            backgroundColor={theme.colors.primary}
            onPress={() => navigation.navigate('RoomFacilityCreateScreen', { breakfastIncluded })}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, // Add background color if needed
  },
  scrollView: {
    flexGrow: 1,
  },
  buttonContainer: {
    backgroundColor: 'white',
    paddingLeft:20,
    paddingRight:20
  },
});
