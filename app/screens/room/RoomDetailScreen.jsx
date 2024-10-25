import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import backIcon from '../../assets/icons/backIcon.png';
import moreIcon from '../../assets/icons/moreIcon.png'; // Add your moreIcon image
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent';
import CauroselComponent from '../../components/Caurosel/CauroselComponent';
import { GetBookingAPI } from '../../services/BookingService';
import CarouselSkeletonComponent from '../../components/Skeleton/CauroselSkeletonComponent';
import {CommonStyles} from '../../style/CommonStyles';
import BookingListComponent from '../../components/List/BookingListComponent';
import RoomService from '../../services/RoomService';
import RoomBottomSheetComponent from '../../components/BottomSheet/RoomBottomSheetComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import InfoCardComponent from '../../components/Card/InfoCardComponent';
import roomInfoData from '../../config/roomInfoData';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';

export default function RoomDetailScreen({navigation}) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [roomCategory, setRoomCategory] = useState([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  useEffect(() => {
    GetBookingAPI(setData);
    RoomService.GetRoomCategory(setRoomCategory);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={CommonStyles.scrollViewContainer}>
        {/* Conditionally render the overlay */}
        {isBottomSheetVisible && (
          <View style={styles.overlay}>
            <TouchableOpacity
              style={StyleSheet.absoluteFillObject}
              onPress={() => setIsBottomSheetVisible(false)}
            />
          </View>
        )}
        <DetailAppBarComponent title={"Room Details"} onMorePress={()=>setIsBottomSheetVisible(true)} navigation={navigation}/>

        {data.length === 0 ? (
          <View>
            <BookingSkeletonComponent />
          </View>
        ) : showLoading ? (
          <CarouselSkeletonComponent />
        ) : (
          <>
            <View style={styles.headerView}>
              <CauroselComponent data={data} setShowLoading={setShowLoading} />
              <Text style={CommonStyles.header}>Room 402</Text>
              <Text style={CommonStyles.subHeader}>
                Standard Rooms . 0.00 Kyats
              </Text>
            </View>
            <View style={CommonStyles.dividerView}>
              <DividerComponent />
            </View>
            {/* Detail */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {roomInfoData.map((item, index) => (
                <View key={index} style={{marginTop: 30}}>
                  <InfoCardComponent title={item.title} value={item.value} />
                </View>
              ))}
            </ScrollView>
            <View style={{marginTop: 10}}>
              <DefaultButtonComponent
                title={'Edit Room'}
                backgroundColor={theme.colors.primary}
                onPress={() => console.log('hello')}
              />
            </View>
            {/* <BookingListComponent data={roomCategory} /> */}
          </>
        )}
        <RoomBottomSheetComponent
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}
          style={styles.bottomSheet} // Ensure the BottomSheet is styled properly
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  headerView: {
    // Add your styles here
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#8c8c8c',
  },
  bottomSheet: {
    zIndex: 1, // Ensure BottomSheet appears above the overlay
  },
});
