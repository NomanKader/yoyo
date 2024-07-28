import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import { CommonStyles } from '../../../style/CommonStyles';
import TextAreaComponent from '../../../components/Typography/TextAreaComponent';

const RoomRuleScreen = ({ navigation }) => {
  const [roomRules, setRoomRules] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={CommonStyles.scrollViewContainer}>
        <StepAppBarComponent title="Room Rule Screen" currentStep={7} navigation={navigation} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Text style={CommonStyles.header}>Room category rules</Text>
          <Text style={CommonStyles.subHeader}>Please select all the room features available in this category.</Text>
          <View style={CommonStyles.component}>
            <TextAreaComponent
              placeholder="Write some rules on this category"
              value={roomRules}
              onChange={setRoomRules}
              backgroundColor={theme.colors.textLightGray}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <DefaultButtonComponent
            title="Proceed"
            backgroundColor={theme.colors.primary}
            onPress={() => {
              navigation.navigate('AppStack',{screen:'RoomPhoto'})
            }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
});

export default RoomRuleScreen;
