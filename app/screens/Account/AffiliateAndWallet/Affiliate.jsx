import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {CommonStyles} from '../../../style/CommonStyles';
import DetailAppBarComponent from '../../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../../components/Divider/DividerComponent';
import PaymentListComponent from '../../../components/List/PaymentListComponent';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import AffiliateImg from '../../../assets/images/affiliate.png';
import theme from '../../../style/colors';

const {width, height} = Dimensions.get('window');

const Affiliate = ({navigation}) => {
  return (
    <ScrollView style={CommonStyles.container}>
      <DetailAppBarComponent title="Affiliate" navigation={navigation} />
      <DividerComponent />

      <View style={CommonStyles.scrollViewContainer}>
        <Image
          source={AffiliateImg}
          style={styles.affiliateImage}
          resizeMode="contain"
        />
        <View style={styles.inviteContainer}>
          <Text style={styles.inviteTitle}>Invite Friends</Text>
          <Text>See benefits of our referral system below</Text>
        </View>
        <View style={styles.paymentListContainer}>
          <PaymentListComponent
            icon="dollar-sign"
            title="High Percentage"
            description="Enjoy percentage when you refer someone and the user books for "
            onPress={() => {}}
            arrowShown={false}
          />
          <PaymentListComponent
            icon="dollar-sign"
            title="Reward for the future"
            description="Earn reward that can be used in the future to purchase airtime and more"
            onPress={() => {}}
            arrowShown={false}
          />
        </View>
        <DefaultButtonComponent
          title="Invite"
          backgroundColor={theme.colors.primary}
        />
        <DefaultButtonComponent
          title="View Referrals"
          color={theme.colors.textDark}
          onPress={() => {
            navigation.navigate('AppStack', {screen: 'ReferralsScreen'});
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Affiliate;

const styles = StyleSheet.create({
  affiliateImage: {
    alignSelf: 'center',
    width: width * 0.8,
  },
  inviteContainer: {
    padding: 10,
  },
  inviteTitle: {
    color: theme.colors.textDark,
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentListContainer: {
    paddingVertical: 20,
  },
});
