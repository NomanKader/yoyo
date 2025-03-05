import React, {memo} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import theme from '../../styles/colors';
import {useTranslation} from 'react-i18next';
import LeftRightText from '../TextUi/LeftRightText';
import {decrypt} from '../../utils/encryption';
import DeviceInfo from 'react-native-device-info';

const CustomTransactionList = memo(({item, navigation}) => {
  const deviceId = DeviceInfo.getUniqueIdSync(); // '123e4567-e89b-12d3-a456-426614174000';
  const decryptedPrice = decrypt(item.price, deviceId);
  const isSuccessAmount = false;
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('PaymentComplete', {
          InvoiceNo: item.invoiceNo,
          from: 'Transaction',
        })
      }>
      <View style={styles.logoContainer}>
        {item.pathImage ? (
          <Image source={{uri: item.pathImage}} style={styles.imageStyle} />
        ) : null}
      </View>
      <View style={{flex: 1}}>
        <LeftRightText
          labelColor={theme.colors.textDark}
          labelNumberOfLines={1}
          valueColor={
            isSuccessAmount ? theme.colors.success : theme.colors.textDark
          }
          valueBold={false}
          label={item.paymentType}
          value={`฿ ${decryptedPrice}`}
          maxWidth="60%"
          mV={1}
        />
        <LeftRightText
          labelColor={theme.colors.textGray}
          valueColor={theme.colors.textGray}
          valueBold={false}
          label={item.transactionDate}
          value={item.paymentPayType}
          maxWidth="40%"
          mV={1}
        />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logoContainer: {
    marginRight: 16,
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    fontSize: 16,
    color: theme.colors.textDark,
    fontFamily: theme.customfonts.medium,
  },
  subHeader: {
    fontSize: 14,
    fontFamily: theme.customfonts.regular,
  },
  rightContainer: {
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  amount: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: theme.customfonts.regular,
  },
});

export default CustomTransactionList;
