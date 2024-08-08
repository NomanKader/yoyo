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
import SelectTabComponent from '../../components/Tab/SelectTabComponent';
import RoomDetailScreen from '../room/RoomDetailScreen';
import roomInfoData from '../../config/roomInfoData';
import InfoCardComponent from '../../components/Card/InfoCardComponent';
import { GetBookingListAPI } from '../../services/BookingService';
import BookingListComponent from '../../components/List/BookingListComponent';
export default function BookingScreen({navigation}) {
  const [showLoading, setShowLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [type, setType] = useState('');
  const { language } = useContext(LanguageContext);  
  const { translate } = useContext(LanguageContext);  

  useEffect(() => {
    console.log("Language", language);
    console.log("Translate", translate);
    const fetchRoomList = async () => {
      setShowLoading(true);
      setTimeout(() => {
        GetBookingListAPI(setRoomData)
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
        <AppBarComponent title={"Bookings"} navigation={navigation} searchData={roomData} type={type} />
        <DividerComponent />
        {showLoading ? (
          <View style={CommonStyles.scrollViewContainer}>
            <ListSkeletonComponent />
            <ListSkeletonComponent />
          </View>            
        ) : (            
          <>
            <View style={{padding:20}}>
            <SelectTabComponent/>
            </View>
          <BookingListComponent data={roomData} navigation={navigation} type={'list'} onPress={()=>navigation.navigate('AppStack',{screen:"BookingDetail"})}/>
          </>
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
