import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CommonStyles } from '../../style/CommonStyles';
import Icon from 'react-native-vector-icons/FontAwesome5'
import theme from '../../style/colors';

const DefaultButtonComponent = ({ title,icon, backgroundColor, onPress,color,otherStyle,otherTextStyle,disable=false }) => {
  return (
    <TouchableOpacity
      style={[CommonStyles.defaultButton, { backgroundColor: backgroundColor },otherStyle]}
      onPress={onPress}
      disabled={disable}
    >    
      <View style={{flexDirection:'row'}}>
        { icon && <Icon name={icon} size={20} style={{marginRight:7,color:theme.colors.textLight}} />}      
        <Text
          style={[
            CommonStyles.defaultButtonText,
            color && { color: color },
            otherTextStyle
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};



export default DefaultButtonComponent;
