import {StyleSheet, View} from 'react-native';
import {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {CommonStyles} from '../../style/CommonStyles';
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent';

import DummyData from '../../config/DummyData.json';
import RommCategoryListComponent from '../../components/List/RoomCategoryListComponent';
import BookingListComponent from '../../components/List/BookingListComponent';

const Active = ({navigation, activeBookings}) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // const timer = setTimeout(() => setShowLoading(false), 2000);
    // // Cleanup timer on unmount
    // return () => clearTimeout(timer);
  });

  const data3 = DummyData.data3;

  if (showLoading) {
    return <BookingSkeletonComponent type="Hotels Nearby" />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[CommonStyles.scrollViewContainer, {flexGrow: 1}]}>
        <BookingListComponent
          data={activeBookings}
          navigation={navigation}
          leftBox={false}
          // type='category'
          onPress={() =>
            navigation.navigate('AppStack', {screen: 'CheckInDetailScreen'})
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Active;

const styles = StyleSheet.create({});
