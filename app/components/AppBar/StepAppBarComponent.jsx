import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CommonStyles } from '../../style/CommonStyles';
import backIcon from '../../assets/icons/backIcon.png';

const StepAppBarComponent = ({currentStep,navigation}) => {
  return (    
    <View style={CommonStyles.room.step}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image
          source={backIcon} // Use appBarIcon for back icon
          style={CommonStyles.appBarIcon}   // Style for both icons
        />
      </TouchableOpacity>      
      <View style={CommonStyles.room.stepContainer}>
        <Text style={CommonStyles.room.stepText}>Step {currentStep} of 8</Text>
      </View>
    </View>
  );
};

export default StepAppBarComponent;
