import React, {useContext, useEffect, useState} from 'react';
import { View, BackHandler } from 'react-native';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import {CommonStyles} from '../../style/CommonStyles';
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
      <View style={CommonStyles.room.container}>
        <AppBarComponent title={translate?.room?.Rooms} navigation={navigation} searchData={roomData} type={type} />
        <DividerComponent />
        {showLoading ? (
          <View style={CommonStyles.scrollViewContainer}>
            <ListSkeletonComponent />
            <ListSkeletonComponent />
          </View>            
        ) : (  
          <RoomListComponent data={roomData} navigation={navigation} type={type} onPress={()=>_handleListService(type,setType,navigation,RoomService,setRoomData,() => navigation.navigate('AppStack', { screen: 'RoomDetailScreen' }))}/>        
        )}
      </View>
    </>
  );
}
