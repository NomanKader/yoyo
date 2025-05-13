import { View } from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import { CommonStyles } from '../../style/CommonStyles';
import DividerComponent from '../../components/Divider/DividerComponent';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import RoomListComponent from '../../components/List/BookingListComponent';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import RoomService from '../../services/RoomService';
import _handleListService from '../../helper/HandleListService';

export default function BookingRoomCategoryScreen({ navigation }) {
  const [showLoading, setShowLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [type, setType] = useState('category');
  const { language } = useContext(LanguageContext);
  const { translate } = useContext(LanguageContext);

  useEffect(() => {
    console.log('Language', language);
    console.log('Translate', translate);
    const fetchRoomList = async () => {
      setShowLoading(true);
      setTimeout(() => {
        RoomService.GetRoomCategory(setRoomData);
        setShowLoading(false);
      }, 3000);
    };
    fetchRoomList();
  }, []);

  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent title={'Room Type'} navigation={navigation} />
      <DividerComponent />

      {showLoading ? (
        <View>
          <ListSkeletonComponent />
          <ListSkeletonComponent />
        </View>
      ) : (
        <View style={{ flex: 1, marginHorizontal: -30 }}>
          <RoomListComponent
            data={roomData}
            navigation={navigation}
            type={type}
            onPress={() =>
              _handleListService(
                type,
                setType,
                navigation,
                RoomService,
                setRoomData,
                () => navigation.navigate('AppStack', { screen: 'CreateBookingScreen' })
              )
            }
          />
        </View>
      )}
    </View>
  );
}
