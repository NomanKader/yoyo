import {ScrollView, View} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import {CommonStyles} from '../../style/CommonStyles';
import DividerComponent from '../../components/Divider/DividerComponent';
import {useEffect, useState} from 'react';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import ListComponent from '../../components/List/ListComponent';
import RoomService from '../../services/RoomService';
import RoomListComponent from '../../components/List/BookingListComponent';
import _handleListService from '../../helper/HandleListService';

export default function HistoryScreen({navigation}) {
  const [showLoading, setShowLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      RoomService.GetRoomList(setData);
      setShowLoading(false);
    }, 3000);
  }, []);
  return (
    showLoading ?(
        <View style={[CommonStyles.container,CommonStyles.scrollViewContainer]}>
            <DetailAppBarComponent title={"History"} navigation={navigation}/>
            <DividerComponent/>
            <ListSkeletonComponent/>
            <ListSkeletonComponent/>
        </View>):
        (
            <>
          <View style={[CommonStyles.container,CommonStyles.scrollViewContainer]}>
            <DetailAppBarComponent title={"History"} navigation={navigation}/>                                             
            <DividerComponent/>            
            </View>
            <RoomListComponent
            data={data}
            navigation={navigation}            
            onPress={() => console.log('Room History Click')}
            />
          </>
        )
    )
}
