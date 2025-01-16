import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import DummyData from '../../config/DummyData.json';
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent';
import {CommonStyles} from '../../style/CommonStyles';
import CarouselComponent from '../../components/Caurosel/CauroselComponent';
import {FlatList} from 'react-native-gesture-handler';
import LeftRightText from '../../components/ConfirmPage/LeftRightText';
import qrImg from '../../assets/images/qrCode.png';
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent';
import PaymentListComponent from '../../components/List/PaymentListComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';

const {width, height} = Dimensions.get('window');

const CheckInDetail = ({navigation, route}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [refundVisible, setRefundVisible] = useState(false);
  const data = DummyData.data;
  const details = DummyData.checkInDetail;

  const {type = ''} = route.params || {};

  if (showLoading) {
    return (
      <>
        <DetailAppBarComponent title="" navigation={navigation} />
        <BookingSkeletonComponent />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={CommonStyles.container}>
        <DetailAppBarComponent
          title="Check in Details"
          navigation={navigation}
          onMorePress={() => {
            setVisible(true);
          }}
        />
        <DividerComponent />
        <View style={[CommonStyles.scrollViewContainer, styles.scrollView]}>
          <FlatList
            ListHeaderComponent={
              <>
                <CarouselComponent
                  data={data}
                  setShowLoading={setShowLoading}
                  navigation={navigation}
                  carouselType="roomDetail"
                />
                <View style={styles.header}>
                  <View>
                    <Text style={CommonStyles.subTitle}>CAL-782 347</Text>
                    <Text style={CommonStyles.text}>
                      Standard Rooms. Room No-406
                    </Text>
                  </View>
                  <Image source={qrImg} style={styles.qr} />
                </View>
              </>
            }
            data={details}
            keyExtractor={item => item.label}
            renderItem={({item}) => (
              <LeftRightText label={item.label} value={item.value} />
            )}
            ListFooterComponent={
              <View>
                {type == 'BookingDetail' && (
                  <DefaultButtonComponent
                    title="Payment and check In"
                    backgroundColor={theme.colors.primary}
                    color={theme.colors.textLight}
                    otherStyle={styles.paymentButton}
                    otherTextStyle={{fontSize: 16}}
                    onPress={() => {
                      navigation.navigate('AppStack', {
                        screen: 'PaymentFormScreen',
                      });
                    }}
                  />
                )}
              </View>
            }
          />
        </View>
        <BottomSheetComponent
          title="More"
          isVisible={visible}
          onClose={() => setVisible(false)}
          snapPoints={['50%', '70%']}>
          <PaymentListComponent
            icon="image"
            title="View Hotel"
            //   description='Make instant payment with ATM Card'
            // onPress={() => {navigation.navigate('AppStack', { screen: 'ReserveConfirmScreen' })}}
          />
          <PaymentListComponent
            icon="alert-circle"
            title="Read room rules"
            //   description='Make instant payment with ATM Card'
            onPress={() => {
              navigation.navigate('AppStack', {screen: 'ReadRoomRulesScreen'});
            }}
          />
          <PaymentListComponent
            icon="minus-circle"
            title="Request refund"
            //   description='Make instant payment with ATM Card'
            onPress={() => {
              setVisible(false);
              setRefundVisible(true);
            }}
          />
        </BottomSheetComponent>

        <BottomSheetComponent
          title="Request refund"
          isVisible={refundVisible}
          onClose={() => setRefundVisible(false)}
          snapPoints={['35%', '50%']}>
          <Text style={CommonStyles.formLabel}>You can request refund</Text>
          <DefaultButtonComponent
            title="Proceed"
            backgroundColor={theme.colors.primary}
            color={theme.colors.textLight}
            otherStyle={styles.proceedButton}
            otherTextStyle={{fontSize: 16}}
            onPress={() => {
              navigation.navigate('AppStack', {screen: 'RefundFormScreen'});
            }}
          />
        </BottomSheetComponent>
      </View>
    </SafeAreaView>
  );
};

export default CheckInDetail;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
  },
  qr: {
    width: 70,
    height: 70,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  paymentButton: {
    width: width * 0.9,
    height: height * 0.07,
    alignSelf: 'center',
  },
  proceedButton: {
    width: width * 0.9,
    height: height * 0.07,
    marginTop: height * 0.1,
    alignSelf: 'center',
  },
});
