import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import {CommonStyles} from '../../style/CommonStyles';

import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const ReadRoomRules = ({navigation, route}) => {
  const [showLoading, setShowLoading] = useState(false);

  if (showLoading) {
    return (
      <>
        <DetailAppBarComponent title="" navigation={navigation} />
        <ListSkeletonComponent />
        <ListSkeletonComponent />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <DetailAppBarComponent title="Read Room Rules" navigation={navigation} />
      <DividerComponent />
      <ScrollView style={[CommonStyles.scrollViewContainer, styles.scrollView]}>
        <Text style={[CommonStyles.formLabel, styles.rules]}>
          We welcome you to our hotel. We are passion driven when it involves
          your comfort. We also want to let you know on the rules of the room
          you booked. One, your room cannot accommodate more than 2 people. If
          you wish to take in more than 2 people. We advise you to cancel this
          booking and book for presidential suite. Also remember to check in on
          your mobile app or at the receptionist. We love you.❤️
          {'\n\n'}
          We welcome you to our hotel. We are passion driven when it involves
          your comfort. We also want to let you know on the rules of the room
          you booked. One, your room cannot accommodate more than 2 people. If
          you wish to take in more than 2 people. We advise you to cancel this
          booking and book for presidential suite. Also remember to check in on
          your mobile app or at the receptionist. We love you.❤️
        </Text>
      </ScrollView>
      <DefaultButtonComponent
        title="Agree and confirm payment"
        backgroundColor={theme.colors.primary}
        color={theme.colors.textLight}
        otherStyle={styles.confirmButton}
        otherTextStyle={{fontSize: 16}}
        onPress={() => {
          navigation.navigate('AppStack', {screen: 'PaymentFormScreen'});
        }}
      />
    </SafeAreaView>
  );
};

export default ReadRoomRules;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  scrollView: {
    flexGrow: 1,
  },
  rules: {
    lineHeight: 25,
  },
  confirmButton: {
    width: width * 0.9,
    height: height * 0.07,
    marginTop: height * 0.1,
    alignSelf: 'center',
  },
});
