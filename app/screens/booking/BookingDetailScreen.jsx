import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import { CommonStyles } from '../../style/CommonStyles';
import CarouselSkeletonComponent from '../../components/Skeleton/CauroselSkeletonComponent';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import CarouselComponent from '../../components/Caurosel/CauroselComponent';
import { GetBookingAPI } from '../../services/BookingService';
import qrImage from '../../assets/icons/qrImage.png';
import DividerComponent from '../../components/Divider/DividerComponent';
import InfoCardComponent from '../../components/Card/InfoCardComponent';
import bookingInfoData from '../../config/bookingInfoData';
import BookingDetailBottomSheetComponent from '../../components/BottomSheet/BookingDetailBottomSheetComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent';

export default function BookingDetailScreen({ navigation }) {
  const [showLoading, setShowLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    GetBookingAPI(setData);
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  }, []);

  const handleProceedPress = () => {
    setShowPaymentConfirmation(true);
    setShowMoreActions(false);
  };

  const handleOptionPress = option => {
    setIsBottomSheetVisible(false);
    switch (option) {
      case 'viewDetails':
        navigation.navigate('CustomerDetailsScreen');
        break;
      case 'editDays':
        navigation.navigate('EditDaysScreen');
        break;
      case 'changeStatus':
        navigation.navigate('ChangeBookingStatusScreen');
        break;
      default:
        break;
    }
  };

  const closeAllBottomSheets = () => {
    setIsBottomSheetVisible(false);
    setShowPaymentConfirmation(false);    
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent
          title={'Booking Details'}
          onMorePress={() => {
            setIsBottomSheetVisible(true);
            setShowMoreActions(true);
          }}
          navigation={navigation}
        />
        {showLoading ? (
          <>
            <CarouselSkeletonComponent />
            <ListSkeletonComponent />
          </>
        ) : (
          <>
            <CarouselComponent data={data} setShowLoading={setShowLoading} />
            <View style={styles.detailsContainer}>
              <View style={styles.textContainer}>
                <Text style={CommonStyles.header}>CAL7394748</Text>
                <Text style={CommonStyles.subHeader}>
                  Standard Rooms . Room 406
                </Text>
              </View>
              <Image source={qrImage} style={styles.qrImage} />
            </View>
            <View style={CommonStyles.dividerView}>
              <DividerComponent />
            </View>
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              {bookingInfoData.map((item, index) => (
                <View key={index} style={styles.infoCardContainer}>
                  <InfoCardComponent title={item.title} value={item.value} />
                </View>
              ))}
            </ScrollView>
            <DefaultButtonComponent
              title={'Proceed'}
              onPress={handleProceedPress}
              backgroundColor={theme.colors.primary}
            />
          </>
        )}
        {/* Overlay */}
        {(isBottomSheetVisible || showPaymentConfirmation) && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={closeAllBottomSheets}
          />
        )}
      </View>
      {/* More Actions Bottom Sheet */}
      {showMoreActions && (
        <BookingDetailBottomSheetComponent
          isVisible={isBottomSheetVisible}
          onClose={closeAllBottomSheets}
          style={styles.bottomSheet}>
          <View style={CommonStyles.bottomSheet.bottomSheetContent}>
            <Text style={CommonStyles.header}>Options</Text>
            <TouchableOpacity onPress={() => handleOptionPress('viewDetails')}>
              <Text style={CommonStyles.bottomSheet.bottomSheetItem}>
                View Customer Details
              </Text>
            </TouchableOpacity>
            <DividerComponent />
            <TouchableOpacity onPress={() => handleOptionPress('editDays')}>
              <Text style={CommonStyles.bottomSheet.bottomSheetItem}>
                Edit Number of Days
              </Text>
            </TouchableOpacity>
            <DividerComponent />
            <TouchableOpacity onPress={() => handleOptionPress('changeStatus')}>
              <Text style={CommonStyles.bottomSheet.bottomSheetItem}>
                Change Booking Status
              </Text>
            </TouchableOpacity>
          </View>
        </BookingDetailBottomSheetComponent>
      )}
      {/* Payment Confirmation Bottom Sheet */}
      {showPaymentConfirmation && (
        <BottomSheetComponent
          isVisible={showPaymentConfirmation}
          onClose={closeAllBottomSheets}
          title={'Payment Confirmation'}>
          <Text style={CommonStyles.bottomSheet.bottomSheetItemText}>
            This customer has not paid yet, do you wish to check-in?
          </Text>
          <View style={CommonStyles.bottomSheet.bottomSheetContent}>
            <DefaultButtonComponent
              title={'Proceed'}
              backgroundColor={theme.colors.primary}
              onPress={() => {
                // Add your proceed logic here                
                closeAllBottomSheets();
                navigation.navigate("AppStack",{screen:'PaymentScreen'})
              }}
            />
          </View>
        </BottomSheetComponent>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  textContainer: {
    flex: 1,
  },
  qrImage: {
    width: 64,
    height: 81,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  infoCardContainer: {
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  bottomSheet: {
    zIndex: 2,
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetItem: {
    paddingVertical: 15,
    fontSize: 16,
  },
});
