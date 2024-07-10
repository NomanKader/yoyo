import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import backIcon from '../../assets/icons/image.png';
import DividerComponent from '../Divider/DividerComponent';
import CauroselSkeletonComponent from './CauroselSkeletonComponent';
import ListSkeletonComponent from './ListSkeletonComponent';
import DefaultButtonComponent from '../Button/DefaultButtonComponent';
import theme from '../../style/colors';
import { CommonStyles } from '../../style/CommonStyles';
const BookingSkeletonComponent = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={backIcon} alt='backIcon' style={CommonStyles.backIcon}/>  
      <CauroselSkeletonComponent />
      <View style={CommonStyles.dividerView}>
      <DividerComponent/>
      </View>      
      <View style={styles.textContainer}>
        <Text style={styles.text}>Room Categories</Text>
        <Text style={styles.seeAll}>See all</Text>
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
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 16,
    color: '#007BFF',
  },
  buttonView:{
    marginTop:10
  },  
});

export default BookingSkeletonComponent;
