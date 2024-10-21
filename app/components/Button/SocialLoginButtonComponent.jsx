import { StyleSheet, Image,TouchableOpacity } from 'react-native'
import React from 'react'

const SocialLoginButtonComponent = ({width=50,height=50,image,marginRight=25,onPress}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
    >
        <Image source={image} style={{width:width,height:height,marginRight:marginRight}} />
    </TouchableOpacity>
  )
}

export default SocialLoginButtonComponent

const styles = StyleSheet.create({})