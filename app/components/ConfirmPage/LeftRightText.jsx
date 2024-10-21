import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../../style/colors'

const LeftRightText = ({label,value}) => {
  return (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
  )
}

export default LeftRightText

const styles = StyleSheet.create({
    row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    },
    label: {
    fontSize: 16,
    color: theme.colors.infoText,
    },
    value: {
    fontSize: 16,
    color: theme.colors.infoText,
    },
})