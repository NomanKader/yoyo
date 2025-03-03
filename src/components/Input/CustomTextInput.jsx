import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import theme from '../../styles/colors'
 
const CustomTextInput = ({title,bottomColor = theme.colors.textLightGray,value,onChangeText}) => {
  return (
    <View style={[styles.container,{borderBottomColor:bottomColor}]}>
        <TextInput placeholder={title} value={value} onChangeText={onChangeText}/>
     </View>
  )
}
 
export default CustomTextInput
 
const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderBottomWidth:1,    
    }
})
