import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CommonStyles } from '../../style/CommonStyles'

const AccordionText = ({text}) => {
  return (
    <View style={{padding:10}}>
      <Text>{text}</Text>
    </View>
  )
}

export default AccordionText

const styles = StyleSheet.create({})