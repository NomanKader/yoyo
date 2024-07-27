import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet} from 'react-native';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import {CommonStyles} from '../../style/CommonStyles';
import theme from '../../style/colors';
import AppBarComponent from '../../components/AppBar/AppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import RoomService from '../../services/RoomService';
import RoomListComponent from '../../components/List/RoomListComponent';
import { LanguageContext } from '../../context/LanguageContext';
export default function RoomScreen({navigation}) {
  const [showLoading, setShowLoading] = useState(false);
  const [roomList,setRoomList]=useState([]);
  const {language}=useContext(LanguageContext);  
  const {translate}=useContext(LanguageContext);
  useEffect(() => {
    console.log("Language",language);
    console.log("Translate",translate);
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
        <AppBarComponent title={translate?.room?.Rooms} navigation={navigation} />
        <DividerComponent />
      {showLoading ? (
        <View style={CommonStyles.scrollViewContainer}>
          <ListSkeletonComponent />
        </View>
      ) : (  
        <RoomListComponent data={roomList} navigation={navigation}/>        
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
