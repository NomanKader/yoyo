import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CommonStyles} from '../../../style/CommonStyles';
import DetailAppBarComponent from '../../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../../components/Divider/DividerComponent';
import PaymentListComponent from '../../../components/List/PaymentListComponent';

const AffiliateAndWallet = ({navigation}) => {
  return (
    <View style={CommonStyles.container}>
      <DetailAppBarComponent
        title="Affiliate and Wallet"
        navigation={navigation}
      />
      <DividerComponent />
      <View style={CommonStyles.scrollViewContainer}>
        <PaymentListComponent
          icon="slack"
          title="Affiliate Service"
          description="Manage your affiliate system"
          onPress={() => {
            navigation.navigate('AppStack', {screen: 'AffiliateScreen'});
          }}
        />
        <PaymentListComponent
          icon="layout"
          title="Wallet"
          description="Manage your wallet services"
          onPress={() => {
            navigation.navigate('AppStack', {screen: 'WalletScreen'});
          }}
        />
      </View>
    </View>
  );
};

export default AffiliateAndWallet;

const styles = StyleSheet.create({});
