import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import { CommonStyles } from '../../style/CommonStyles';
import CarouselSkeletonComponent from '../../components/Skeleton/CauroselSkeletonComponent';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import CarouselComponent from '../../components/Caurosel/CauroselComponent';
import { CheckIn, GetBookingById } from '../../services/BookingService';
import DividerComponent from '../../components/Divider/DividerComponent';
import InfoCardComponent from '../../components/Card/InfoCardComponent';
import BookingDetailBottomSheetComponent from '../../components/BottomSheet/BookingDetailBottomSheetComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent';
import { BASE_IMAGE_URL } from '../../../common/service/HttpService';
import bookingInfoConfig from '../../config/bookingInfoData';
import reservatedIcon from '../../assets/icons/reservatedIcon.png';

export default function BookingDetailScreen({ navigation, route }) {
  const { id } = route.params;

  const [showLoading, setShowLoading] = useState(false);
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [bookingInfo, setBookingInfo] = useState([]);

  // Extra charges
  const [extraAmount, setExtraAmount] = useState('');
  const [extraImage, setExtraImage] = useState(null);

  // Mini bar usage
  const [minibarItems, setMinibarItems] = useState([
    { id: 1, name: 'Cola', unitPrice: 1000, qty: 0 },
    { id: 2, name: 'Juice', unitPrice: 1500, qty: 0 },
    { id: 3, name: 'Beer', unitPrice: 2500, qty: 0 },
  ]);

  const todayMiniBarTotal = minibarItems.reduce(
    (sum, item) => sum + (item.unitPrice || 0) * (item.qty || 0),
    0,
  );

  const isCheckedIn = data?.status === 2; // 2 = checkin

  const handleUploadPress = () => {
    // TODO: integrate image picker here
  };

  const handleSaveExtraCharge = () => {
    // TODO: call API / update booking with extraAmount + extraImage
    Alert.alert('Saved', 'Extra charge saved successfully.');
  };

  const changeMiniBarQty = (id, delta) => {
    setMinibarItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(0, item.qty + delta) }
          : item,
      ),
    );
  };

  const formatValue = (key, booking) => {
    if (!booking) return '';

    switch (key) {
      case 'bookingId':
        return booking.bookingNumber || '';
      case 'roomPrice':
        return booking.pricePerNight ? `${booking.pricePerNight} MMK` : '';
      case 'reservationType':
        return booking.purchased ? 'Paid' : 'Pay on Arrival';
      case 'bookingStatus':
        return booking.purchased ? 'Paid' : 'Unpaid';
      case 'guestName':
        return booking.guestName || '';
      case 'phone':
        return booking.phone || '';
      case 'guestEmail':
        return booking.guestEmail || '';
      case 'checkInDate':
        return booking.checkInDate
          ? booking.checkInDate.split('T')[0]
          : '';
      case 'checkOutDate':
        return booking.checkOutDate
          ? booking.checkOutDate.split('T')[0]
          : '';
      case 'totalAmount':
        return booking.totalPrice ? `${booking.totalPrice} MMK` : '';
      case 'lengthOfDay': {
        const start = booking.checkInDate
          ? new Date(booking.checkInDate)
          : null;
        const end = booking.checkOutDate
          ? new Date(booking.checkOutDate)
          : null;
        if (!start || !end) return '';
        const ms = end.getTime() - start.getTime();
        const days = Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
        return `${days} Day${days > 1 ? 's' : ''}`;
      }
      default:
        return '';
    }
  };

  // 🚥 Status label + color by status code
  const getStatusMeta = status => {
    switch (status) {
      case 0:
        return {
          label: 'Booking',
          bgColor: '#FEF3C7',
          textColor: '#92400E',
        };
      case 1:
        return {
          label: 'Available',
          bgColor: '#E0F2FE',
          textColor: '#0369A1',
        };
      case 2:
        return {
          label: 'Check-in',
          bgColor: '#DCFCE7',
          textColor: '#166534',
        };
      default:
        return null;
    }
  };

  useEffect(() => {
    async function load() {
      try {
        setShowLoading(true);
        const response = await GetBookingById(id);
        const booking = response?.data;

        setData(booking);

        setImages(
          (booking?.roomPhotos || []).map((item, index) => ({
            id: index + 1,
            url: `${BASE_IMAGE_URL}${item.photoName}`,
          })),
        );

        const mappedInfo = bookingInfoConfig.map(item => {
          if (item.isSection) {
            return item;
          }
          return {
            ...item,
            value: formatValue(item.key, booking),
          };
        });

        setBookingInfo(mappedInfo);
      } catch (err) {
        console.log(err);
        Alert.alert('Error', 'Failed to load booking details');
      } finally {
        setShowLoading(false);
      }
    }

    load();
  }, [id]);

  const handleProceedPress = () => {
    // if (!data?.purchased) { ... }
    checkIn();
  };

  const handleOptionPress = option => {
    setIsBottomSheetVisible(false);
    switch (option) {
      case 'viewDetails':
        navigation.navigate('CustomerDetailsScreen', { bookingId: id });
        break;
      case 'editDays':
        navigation.navigate('EditDaysScreen', { bookingId: id });
        break;
      case 'changeStatus':
        navigation.navigate('ChangeBookingStatusScreen', { bookingId: id });
        break;
      default:
        break;
    }
  };

  const checkIn = async () => {
    try {
      setShowLoading(true);
      await CheckIn(id);
      navigation.push('AppStack', {
        screen: 'SuccessScreen',
        params: {
          icon: reservatedIcon,
          buttonText: 'View Detail',
          color: theme.colors.primary,
          isShowingIllustration: true,
          header: 'Check-in Successful',
          subheader: `Check-in for room ${data?.roomNumber} is successful.`,
          nextScreen: 'TabScreen',
          nextScreenParams: {},
        },
      });
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Check-in failed');
    } finally {
      setShowLoading(false);
    }
  };

  const handleCheckOutPress = () => {
    // mini bar + extra charges total you want to show on checkout screen
    const miniBarTotal = todayMiniBarTotal;                  // from minibarItems
    const extraCharges = Number(extraAmount || 0);           // from text input
    const totalExtraCharges = miniBarTotal + extraCharges;

    navigation.navigate('CheckoutScreen', {
      bookingId: id,
      roomNumber: data?.roomNumber,
      totalExtraCharges,               // 👈 what you show in “extra charges total”
      customerName: data?.guestName,
      phone: data?.phone,
      email: data?.guestEmail,
      roomType: data?.roomCategoryName,
    });
  };


  const closeAllBottomSheets = () => {
    setIsBottomSheetVisible(false);
    setShowPaymentConfirmation(false);
  };

  const statusMeta = getStatusMeta(data?.status);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent
          title={'Check-in details'}
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
            <CarouselComponent data={images} setShowLoading={setShowLoading} />

            <View style={styles.detailsContainer}>
              <View style={styles.textContainer}>
                <Text style={CommonStyles.header}>{data?.roomNumber}</Text>
                <Text style={CommonStyles.subHeader}>
                  {data?.roomCategoryName}
                </Text>
              </View>

              {/* 🔵 Status pill instead of QR */}
              {statusMeta && (
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: statusMeta.bgColor },
                  ]}>
                  <Text
                    style={[
                      styles.statusBadgeText,
                      { color: statusMeta.textColor },
                    ]}>
                    {statusMeta.label}
                  </Text>
                </View>
              )}
            </View>

            <View style={CommonStyles.dividerView}>
              <DividerComponent />
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              {bookingInfo.map((item, index) => (
                <View key={index} style={styles.infoCardContainer}>
                  {item.isSection ? (
                    <Text style={styles.sectionTitle}>{item.title}</Text>
                  ) : (
                    <InfoCardComponent title={item.title} value={item.value} />
                  )}
                </View>
              ))}

              {/* Mini bar usage card */}
              {isCheckedIn && (
                <View className="card" style={styles.card}>
                  <Text style={styles.sectionTitle}>Mini bar usage</Text>

                  <View style={styles.miniBarDayRow}>
                    <View style={styles.miniBarDateRow}>
                      <Text style={styles.miniBarDateText}>
                        {formatValue('checkInDate', data)}
                      </Text>
                      <Text style={styles.miniBarTimeText}>11:50 am</Text>
                    </View>
                    <View style={styles.dayBadge}>
                      <Text style={styles.dayBadgeText}>Day 1</Text>
                    </View>
                  </View>

                  <Text style={styles.miniBarHint}>
                    Please check the mini bar usage by the customer!
                  </Text>

                  {minibarItems.map(item => (
                    <View key={item.id} style={styles.miniBarRow}>
                      <View>
                        <Text style={styles.miniBarItemName}>{item.name}</Text>
                        <Text style={styles.miniBarItemPrice}>
                          1x {item.unitPrice} MMK
                        </Text>
                      </View>

                      <View style={styles.miniBarQtyContainer}>
                        <TouchableOpacity
                          style={[
                            styles.qtyButton,
                            item.qty <= 0 && styles.qtyButtonDisabled,
                          ]}
                          onPress={() => changeMiniBarQty(item.id, -1)}
                          disabled={item.qty <= 0}>
                          <Text style={styles.qtyButtonText}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.qtyText}>{item.qty}</Text>

                        <TouchableOpacity
                          style={styles.qtyButton}
                          onPress={() => changeMiniBarQty(item.id, +1)}>
                          <Text style={styles.qtyButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}

                  <View style={styles.todayTotalContainer}>
                    <Text style={styles.todayTotalLabel}>Today's total</Text>
                    <Text style={styles.todayTotalValue}>
                      {todayMiniBarTotal} MMK
                    </Text>
                  </View>

                  <DefaultButtonComponent
                    title="Save Today's Usages"
                    backgroundColor={theme.colors.primary}
                    onPress={() => {
                      // TODO: save minibar usage API
                    }}
                    style={{ marginTop: 12 }}
                  />
                </View>
              )}

              {/* Extra charges card */}
              {isCheckedIn && (
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Extra charges</Text>
                  <Text style={styles.extraChargesDescription}>
                    Upload bill slips used by the customer and enter total
                    amount.
                  </Text>

                  <TouchableOpacity
                    style={styles.uploadCard}
                    onPress={handleUploadPress}
                    activeOpacity={0.8}>
                    {!extraImage && (
                      <>
                        <View style={styles.uploadIconCircle}>
                          <Text style={styles.uploadIconText}>+</Text>
                        </View>
                        <Text style={styles.uploadLabel}>Upload Image</Text>
                      </>
                    )}
                    {extraImage && (
                      <Image
                        source={{ uri: extraImage }}
                        style={styles.uploadPreviewImage}
                      />
                    )}
                  </TouchableOpacity>

                  <View style={styles.amountRow}>
                    <View style={styles.amountInputWrapper}>
                      <TextInput
                        style={styles.amountInput}
                        placeholder="Enter total amount"
                        keyboardType="numeric"
                        value={extraAmount}
                        onChangeText={setExtraAmount}
                      />
                      <View style={styles.currencyBadge}>
                        <Text style={styles.currencyText}>MMK</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleSaveExtraCharge}
                      activeOpacity={0.8}>
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View style={{ height: 24 }} />
            </ScrollView>

            <DefaultButtonComponent
              title={isCheckedIn ? 'Check out' : 'Check in'}
              onPress={isCheckedIn ? handleCheckOutPress : handleProceedPress}
              backgroundColor={theme.colors.primary}
              style={{ marginHorizontal: 16, marginBottom: 16 }}
            />
          </>
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
                navigation.push('AppStack', { screen: 'PaymentScreen' });
                closeAllBottomSheets();
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
    paddingHorizontal: 16,
    marginTop: 20,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },

  // 🔵 Status pill styles
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  qrImage: {
    width: 64,
    height: 81,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  infoCardContainer: {
    marginTop: 16,
  },
  bottomSheet: {
    zIndex: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },

  card: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },

  extraChargesDescription: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },

  uploadCard: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#F9F9F9',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  uploadIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  uploadIconText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
  },

  uploadLabel: {
    fontSize: 13,
    color: '#777',
  },

  uploadPreviewImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  amountInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },

  amountInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },

  currencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  currencyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },

  saveButton: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
  },

  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },

  miniBarDayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  miniBarDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniBarDateText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginRight: 6,
  },
  miniBarTimeText: {
    fontSize: 12,
    color: '#999',
  },
  dayBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
  },
  dayBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  miniBarHint: {
    marginTop: 10,
    fontSize: 12,
    color: '#6B7280',
  },
  miniBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  miniBarItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  miniBarItemPrice: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  miniBarQtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonDisabled: {
    opacity: 0.3,
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  qtyText: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginHorizontal: 8,
  },
  todayTotalContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayTotalLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  todayTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
});
