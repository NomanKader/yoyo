import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import backIcon from '../../assets/icons/backIcon.png';
import DividerComponent from '../Divider/DividerComponent';
import CauroselSkeletonComponent from './CauroselSkeletonComponent';
import ListSkeletonComponent from './ListSkeletonComponent';
import DefaultButtonComponent from '../Button/DefaultButtonComponent';
import theme from '../../style/colors';
import { CommonStyles } from '../../style/CommonStyles';
const BookingSkeletonComponent = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={backIcon} alt='backIcon' style={CommonStyles.appBarIcon}/>  
      <CauroselSkeletonComponent />
      <View style={CommonStyles.dividerView}>
      <DividerComponent/>
      </View>      
      <View style={CommonStyles.textContainer}>
        <Text style={CommonStyles.text}>Room Categories</Text>
        <Text style={CommonStyles.seeAll}>See all</Text>
      </View>
      <ListSkeletonComponent />
      <View style={CommonStyles.dividerView}>
      <DividerComponent/>
      </View>
      <View style={styles.buttonView}>
      <DefaultButtonComponent title={'Book a Room'} backgroundColor={theme.colors.primary} onPress={()=>Alert.alert("Info","Booking Press")}/>      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  buttonView:{
    marginTop:10
  },  
});

export default BookingSkeletonComponent;
