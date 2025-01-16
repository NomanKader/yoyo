import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CommonStyles} from '../../../style/CommonStyles';
import DividerComponent from '../../../components/Divider/DividerComponent';
import DetailAppBarComponent from '../../../components/AppBar/DetailAppBarComponent';
import WalletCardComponent from '../../../components/Card/WalletCardComponent';
import theme from '../../../style/colors';
import withdrawIcon from '../../../assets/icons/withdrawIcon.png';

const Wallet = ({navigation}) => {
  return (
    <View style={CommonStyles.container}>
      <DetailAppBarComponent title="Wallet" navigation={navigation} />
      <DividerComponent />
      <View style={CommonStyles.scrollViewContainer}>
        <WalletCardComponent
          label="Wallet Balance"
          amount={1000}
          backgroundColor={theme.colors.primary}
          IconText="Withdraw"
        />
        <View>
          <Text style={styles.transitionTitle}>Wallet Transactions</Text>
          <DividerComponent />
        </View>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  transitionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginVertical: 20,
    // marginHorizontal: 20,
  },
});
