import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CommonStyles } from '../../style/CommonStyles'
import SearchAppBarComponent from '../../components/AppBar/SearchAppBarComponent'
import { ScrollView } from 'react-native-gesture-handler'
import HotelCardWithIcon from '../../components/Card/HotelCardWithIcon'

const Search = ({navigation}) => {
  return (
    <SafeAreaView style={CommonStyles.container}>
      <SearchAppBarComponent navigation={navigation} />
      <HotelCardWithIcon />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})