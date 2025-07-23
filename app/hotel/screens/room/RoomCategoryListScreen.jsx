import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import { View, BackHandler } from 'react-native';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import {CommonStyles} from '../../style/CommonStyles';
import AppBarComponent from '../../components/AppBar/AppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import RoomService from '../../services/RoomService';
import RoomListComponent from '../../components/List/RoomListComponent';
import { LanguageContext } from '../../../hotel/context/LanguageContext';
import _handleListService from '../../helper/HandleListService';
import { RoomContext } from '../../context/RoomContext';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
export default function RoomCategoryListScreen({navigation}) {
  const [showLoading, setShowLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const {type,setType} = useContext(RoomContext);
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

 // ⛳️ Control tab bar visibility based on `type`
  useLayoutEffect(() => {
    const parent = navigation.getParent(); // Get Tab Navigator
    console.log("type", type);
    if (type === 'list') {
      parent?.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      parent?.setOptions({ tabBarStyle: { display: 'none' } });
    }
  }, [navigation, type]);

  

  return (
    <>
      <View style={CommonStyles.room.container}>
        <AppBarComponent title={translate?.room?.Rooms} navigation={navigation} searchData={roomData} type={type} showBackIcon={type=='list'?true:false} onPressBack={()=>handleBackPress()} />
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
