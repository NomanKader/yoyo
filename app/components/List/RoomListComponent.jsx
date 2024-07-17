import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import DividerComponent from '../Divider/DividerComponent';
import theme from '../../style/colors';
import { LanguageContext } from '../../context/LanguageContext';
import myanmarLanguage from '../../config/myanmar';
import englishLanuage from '../../config/english';

const RoomListComponent = ({ data }) => {
  const {language}=useContext(LanguageContext);

  const renderItem = ({ item }) => {
    const statusStyles = [
      styles.status,
      item.roomStatus === 'Occupied'
        ? styles.occupied
        : item.roomStatus === 'Vacant'
        ? styles.vacant
        : styles.defaultStatus,
    ];
    const languageKey = language === 'mm' ? 'myanmarLanguage' : 'englishLanguage';
    const roomStatusTranslations = {
      Occupied: { myanmarLanguage: myanmarLanguage.room.Occupied, englishLanguage: englishLanuage.room.Occupied },
      Vacant: { myanmarLanguage: myanmarLanguage.room.Vacant, englishLanguage: englishLanuage.room.Vacant }
    };
    
    const roomStatus = roomStatusTranslations[item.roomStatus] ? roomStatusTranslations[item.roomStatus][languageKey] : item.roomStatus;
        return (
      <>
      <View style={styles.card}>
        <View style={styles.thumbnail}>
          <Image
            source={{ uri: item.roomPhoto }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <View>
            <Text style={styles.title}>{item.roomNumber}</Text>
            <Text style={styles.subtitle}>
              {item.roomCategory}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={statusStyles}>
              <Text style={item.roomStatus=='Occupied'?styles.occupied:styles.vacant}>{roomStatus}</Text>
            </View>
          </View>
        </View>
      </View>
      <DividerComponent/>
      </>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />    
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.colors.textLight,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 100,
    height: 100,
    justifyContent:'center',

  },
  image: {
    width: '50%',
    height: '50%',
    borderRadius:120,
    justifyContent:'center'
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    right:30
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    right:30
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight:10,
    borderRadius: 5,
  },
  occupied: {
    backgroundColor: '#EAFAF6',
    color:'#19B791',
    fontWeight:'bold'
  },
  vacant: {
    backgroundColor: '#FFF4EC',
    color:'#FF8B33',
    fontWeight:'bold'
  },
  defaultStatus: {
    backgroundColor: 'grey',
  },
});

export default RoomListComponent;
