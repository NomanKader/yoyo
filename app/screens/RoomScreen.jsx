import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListSkeletonComponent from '../components/Skeleton/ListSkeletonComponent';
import {CommonStyles} from '../style/CommonStyles';
import theme from '../style/colors';
import AppBarComponent from '../components/AppBar/AppBarComponent';
import DividerComponent from '../components/Divider/DividerComponent';
import RoomService from '../services/RoomService';
import RoomListComponent from '../components/List/RoomListComponent';
import { LanguageContext } from '../context/LanguageContext';
import myanmarLanguage from '../config/myanmar';
import englishLanuage from '../config/english';

export default function RoomScreen() {
  const [showLoading, setShowLoading] = useState(false);
  const [roomList,setRoomList]=useState([]);
  const {language}=useContext(LanguageContext);
  useEffect(() => {
    console.log("Language",language);
    const fetchRoomList = async () => {
      setShowLoading(true);
      await RoomService.GetRoomList(setRoomList)
      setShowLoading(false);
    };
    fetchRoomList();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <AppBarComponent title={language=='mm'?myanmarLanguage.room.Rooms:englishLanuage.room.Rooms} />
        <DividerComponent />
      {showLoading ? (
        <View style={CommonStyles.scrollViewContainer}>
          <ListSkeletonComponent />
        </View>
      ) : (  
        <RoomListComponent data={roomList}/>        
      )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    color: theme.colors.textDark,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
    padding: 10,
    backgroundColor: '#fff', // Add background color for better visibility
    borderRadius: 50,
    color: 'black',
    elevation: 4, // Add shadow/elevation to the icons
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
