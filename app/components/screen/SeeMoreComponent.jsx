import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CommonStyles } from '../../style/CommonStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SeeMoreComponent = ({title,onPress}) => {
  return (
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Text style={CommonStyles.subTitle}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
            <Text style={{color:'blue',fontSize:13,marginTop:10}}>Show all</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SeeMoreComponent

const styles = StyleSheet.create({})