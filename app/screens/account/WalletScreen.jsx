import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import WalletCardComponent from '../../components/Card/WalletCardComponent';
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent';
import sendIcon from '../../assets/icons/sendIcon.png';
import withdrawIcon from '../../assets/icons/withdrawIcon.png';
import paymentIcon from '../../assets/icons/paymentIcon.png';
import walletPaymentIcon from '../../assets/icons/walletPaymentIcon.png';
import walletWithdrawIcon from '../../assets/icons/walletWithdrawIcon.png';
import walletTransactionList from '../../config/walletTransactionList';
import theme from '../../style/colors';
import {CommonStyles} from '../../style/CommonStyles';

// Helper function to determine transaction details
const getTransactionDetails = transaction => {
  const isWithdraw = transaction.status === 'Withdraw';
  return {
    icon: isWithdraw ? walletWithdrawIcon : walletPaymentIcon,
    label: isWithdraw ? 'Pending withdrawal from' : 'Successful payment from',
    name: isWithdraw ? 'Wallet' : transaction.name,
    detail: transaction.detail,
    amount: isWithdraw ? `-${transaction.amount}` : `+${transaction.amount}`,
    color: isWithdraw ? '#FF8B33' : '#31D0AA',
  };
};

export default function WalletScreen({navigation}) {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState({});

  const handleTransactionPress = transaction => {
    setBottomSheetContent(getTransactionDetails(transaction));
    setBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const handleAddBankAccount=()=>{
    navigation.navigate('AppStack',{screen:'AddBankAccountScreen'})
  }
  return (
    <View style={CommonStyles.container}>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent title="Wallet" navigation={navigation} />
        <DividerComponent />
        <WalletCardComponent
          label="Balance"
          amount="0.00 Kyats"
          icon={sendIcon}
          backgroundColor={theme.colors.walletCardColor}
          onPress={handleAddBankAccount}
        />
        <Text style={[CommonStyles.header, {fontSize: 18,marginBottom:10}]}>Transactions</Text>
         <ScrollView showsVerticalScrollIndicator={false}>
        {walletTransactionList.map((transaction, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleTransactionPress(transaction)}>
            <View style={styles.transactionContainer}>
              <Image
                source={
                  transaction.status === 'Withdraw' ? withdrawIcon : paymentIcon
                }
                style={styles.icon}
              />
              <View style={styles.transactionDetails}>
                <Text style={styles.amount}>{transaction.amount}</Text>
                <Text style={styles.date}>{transaction.date}</Text>
              </View>
              <View
                style={[
                  styles.statusContainer,
                  transaction.status === 'Withdraw'
                    ? styles.withdrawStatus
                    : styles.paymentStatus,
                ]}>
                <Text
                  style={[
                    styles.statusText,
                    transaction.status === 'Withdraw'
                      ? styles.withdrawText
                      : styles.paymentText,
                  ]}>
                  {transaction.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        </ScrollView>    
        <BottomSheetComponent
          isVisible={bottomSheetVisible}
          onClose={handleCloseBottomSheet}
          snapPoints={['60%', '40%']}>
          <View style={styles.bottomSheetContent}>
            <Image
              source={bottomSheetContent.icon}
              style={styles.bottomSheetIcon}
            />
            <Text style={[CommonStyles.subHeader, {fontSize: 20}]}>
              {bottomSheetContent.label}
            </Text>
            <Text style={styles.bottomSheetLabel}>
              {bottomSheetContent.name}
            </Text>
            <Text style={styles.bottomSheetDetail}>
              {bottomSheetContent.detail}
            </Text>
            <Text
              style={[
                styles.bottomSheetAmount,
                {color: bottomSheetContent.color},
              ]}>
              {`${bottomSheetContent?.amount?.includes('-') ? '-' : '+'}${Number(
                Math.abs(parseFloat(bottomSheetContent.amount || 0)),
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            </Text>
          </View>
        </BottomSheetComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  icon: {
    width: 38,
    height: 38,
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  date: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  withdrawStatus: {
    backgroundColor: '#FFF8F2',
  },
  paymentStatus: {
    backgroundColor: '#EAFAF6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  withdrawText: {
    color: '#FF8B33',
  },
  paymentText: {
    color: '#19B791',
  },
  bottomSheetContent: {
    alignItems: 'center',
    padding: 20,
  },
  bottomSheetIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  bottomSheetLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bottomSheetDetail: {
    fontSize: 14,
    marginBottom: 10,
  },
  bottomSheetAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
