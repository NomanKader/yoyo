import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler, Alert } from 'react-native';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import { CommonStyles } from '../../style/CommonStyles';
import theme from '../../style/colors';
import AppBarComponent from '../../components/AppBar/AppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import BookingListComponent from '../../components/List/BookingListComponent';
import SelectTabComponent from '../../components/Tab/SelectTabComponent';
import { LanguageContext } from '../../context/LanguageContext';
import { GetBookingListAPI } from '../../services/BookingService';

export default function BookingScreen({ navigation }) {
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

  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit the app?',
      [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
    return true; // Prevent default behavior
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
            <View style={{ padding: 20 }}>
              <SelectTabComponent />
            </View>
            <BookingListComponent 
              data={roomData} 
              navigation={navigation} 
              type={'list'} 
              onPress={() => navigation.navigate('AppStack', { screen: "BookingDetailScreen" })}
            />
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
