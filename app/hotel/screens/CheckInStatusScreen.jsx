import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../components/Divider/DividerComponent';
import InfoCardComponent from '../components/Card/InfoCardComponent';
import {CommonStyles} from '../style/CommonStyles';
import theme from '../style/colors';
import { withDecay } from 'react-native-reanimated';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';

export default function CheckInStatusScreen({navigation}) {
  // Array of objects containing the title and value for each InfoCardComponent
  const infoCards = [
    {title: 'Date & Time', value: '13-01-2024. 9:30AM'},
    {title: 'Check out date', value: '15-01-2024. 12:00PM'},
  ];

  return (
    <ScrollView contentContainerStyle={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent title="Check In" navigation={navigation} />
      <DividerComponent />
      <View style={styles.centeredContainer}>
        <Text style={styles.text}>Total Check-In</Text>
      </View>
      <Text style={styles.countText}>1</Text>
      {/* Map through the infoCards array to render InfoCardComponent */}
      {infoCards.map((card, index) => (
        <View style={CommonStyles.dividerView}>
          <InfoCardComponent
            key={index}
            title={card.title}
            value={card.value}
          />
        </View>
      ))}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Check in successfully</Text>
        <Text style={styles.subheader}>Check in for Room 406 is successful and the   ID is CAL7394748</Text>
      </View>
      <View style={CommonStyles.defaultButtonContainer}>
        <DefaultButtonComponent title={"Back to booking detail"} backgroundColor={theme.colors.primary} onPress={()=>navigation.navigate("Booking")}/>
      </View>
    </ScrollView>
  );
}

const styles = {
  centeredContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  countText: {
    fontSize: 32,
    alignSelf: 'center',
    color: theme.colors.textDark,
    fontWeight: 'bold',
  },
  text:{
    fontSize:13,
  },
  headerContainer:{
    marginTop:120,
    alignSelf:'center',    
  },
  header:{
    fontSize: 24,
    alignSelf: 'center',
    color: theme.colors.textDark,
    fontWeight: 'bold',
  },
  subheader:{
    fontSize:15,
    fontWeight:'bold',
    color:theme.colors.textDark,
    marginTop:50,
    textAlign:'center',
    width:310    
  }
};
