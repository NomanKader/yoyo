import React from 'react';
import { View, Text, FlatList, Image, Alert, ScrollView } from 'react-native';
import { CommonStyles } from '../../style/CommonStyles'; // Adjust the path as needed
import DefaultButtonComponent from '../Button/DefaultButtonComponent';
import theme from '../../style/colors';

const ListComponent = ({ data }) => {
    console.log("Room Data",data);
  const renderItem = ({ item }) => (
    <View style={CommonStyles.list.card}>
      <View style={CommonStyles.list.thumbnail}>
      <Image 
        source={{ uri: item.roomPhoto }} 
        style={{ width: '100%', height: '100%',objectFit:'cover' }} 
      />
      </View>
      <View style={CommonStyles.list.details}>
        <Text style={CommonStyles.list.title}>{item.roomName}</Text>
        <Text style={CommonStyles.list.subtitle}>{item.priceKyats+" Kyats"}</Text>
      </View>
    </View>
  );

  return (    
    <>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
    <DefaultButtonComponent title={"Booking"} backgroundColor={theme.colors.primary} onPress={()=>Alert.alert("Info","Booking")}/>
    </>     
  );
};

export default ListComponent;
