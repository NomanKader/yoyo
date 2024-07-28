import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import {CommonStyles} from '../../style/CommonStyles';
import theme from '../../style/colors';
import AppBarComponent from '../../components/AppBar/AppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import RoomService from '../../services/RoomService';
import RoomListComponent from '../../components/List/RoomListComponent';
import { LanguageContext } from '../../context/LanguageContext';
import _handleListService from '../../helper/HandleListService';
export default function RoomCategoryListScreen({navigation}) {
  const [showLoading, setShowLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [type, setType] = useState('category');
  const { language } = useContext(LanguageContext);  
  const { translate } = useContext(LanguageContext);  

  useEffect(() => {
    console.log("Language", language);
    console.log("Translate", translate);
    const fetchRoomList = async () => {
      setShowLoading(true);
      setTimeout(() => {
        RoomService.GetRoomCategory(setRoomData)        
        setShowLoading(false);
      }, 3000);      
    };
    fetchRoomList();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = async() => {   
    await RoomService.GetRoomCategory(setRoomData);
    setType('category')    
    return true; // Return true to prevent default back button behavior
  };



  return (
    <>
      <View style={styles.container}>
        <AppBarComponent title={translate?.room?.Rooms} navigation={navigation} searchData={roomData} type={type} />
        <DividerComponent />
        {showLoading ? (
          <View style={CommonStyles.scrollViewContainer}>
            <ListSkeletonComponent />
            <ListSkeletonComponent />
          </View>            
        ) : (  
          <RoomListComponent data={roomData} navigation={navigation} type={type} onPress={()=>_handleListService(type,setType,navigation,RoomService,setRoomData)}/>        
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
