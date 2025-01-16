import {StyleSheet, Text, View} from 'react-native';
import React, {version} from 'react';
import DividerComponent from '../../components/Divider/DividerComponent';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import PaymentListComponent from '../../components/List/PaymentListComponent';
import {CommonStyles} from '../../style/CommonStyles';
import theme from '../../style/colors';

const AboutTheApp = ({navigation}) => {
  return (
    <View style={CommonStyles.container}>
      <DetailAppBarComponent title="About the App" navigation={navigation} />
      <DividerComponent />
      <View style={CommonStyles.scrollViewContainer}>
        <PaymentListComponent
          icon="slack"
          title="Terms of Service"
          description="Know more about our terms of service"
        />
        <PaymentListComponent
          icon="slack"
          title="FAQ"
          description="Frequently Asked Questions"
        />
        <PaymentListComponent
          icon="slack"
          title="About"
          description="Know more about the App"
        />

        <Text style={styles.version}>Version {'1.0.0'}</Text>
      </View>
    </View>
  );
};

export default AboutTheApp;

const styles = StyleSheet.create({
  version: {
    fontSize: 14,
    color: theme.colors.textDark,
    marginVertical: 20,
    textAlign: 'center',
  },
});
