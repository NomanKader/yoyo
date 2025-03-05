import {View, Text} from 'react-native';
import theme from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { CommonStyles } from '../../styles/CommonStyles';
import { useTranslation } from 'react-i18next';
export default function CustomBalanceCard() {
  const {t}=useTranslation();
  return (
    <View
      style={{
        width: '100%',
        height: 180,
        backgroundColor: theme.colors.whiteTransparent,
        elevation: 6,
        position: 'absolute',
        top: 10,
        zIndex: 1,
        borderRadius: 20,
        alignItems: 'center',
      }}>
      <View
        // colors={[theme.colors.accent, theme.colors.accent]}
        style={{
          width: '100%',
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: 'center',
        }}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Text
          style={[
            CommonStyles.header,
            {
              marginTop: 15,
              color: '#2B2B2B',
              fontSize: 23,
              fontFamily: theme.customfonts.medium,
            },
          ]}>
          {t('greeting') + ' PPS'}
        </Text>
        <Text
          style={[
            CommonStyles.subHeader,
            {
              marginTop: -10,
              color: theme.colors.textDarkGray,
              fontFamily: theme.customfonts.medium,
            },
          ]}>
          1000100000010000
        </Text>

        {/* Label Row */}
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 24,
          }}>
          <Text
            style={[
              CommonStyles.header,
              {
                fontFamily: theme.customfonts.regular,
                color: theme.colors.textGray,
                fontSize: 16,
              },
            ]}>
            {t('remaining_amount')}
          </Text>
          <Text
            style={[
              CommonStyles.header,
              {
                fontFamily: theme.customfonts.regular,
                color: theme.colors.textGray,
                fontSize: 16,
              },
            ]}>
            {t('amount_can_topup')}
          </Text>
        </View>

        {/* Amount Row */}
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 3,
          }}>
          <Text
            style={[
              CommonStyles.header,
              {
                fontFamily: theme.customfonts.medium,
                color: theme.colors.primary,
              },
            ]}>
            ฿ 2,999.00
          </Text>
          <Text
            style={[
              CommonStyles.header,
              {
                fontFamily: theme.customfonts.medium,
                color: theme.colors.textDarkGray,
              },
            ]}>
            ฿ 25,000.00
          </Text>
        </View>
      </View>
    </View>
  );
}