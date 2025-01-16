import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {CommonStyles} from '../../../style/CommonStyles';
import DetailAppBarComponent from '../../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../../components/Divider/DividerComponent';
import theme from '../../../style/colors';
import PaymentListComponent from '../../../components/List/PaymentListComponent';

const Referrals = ({navigation}) => {
  let count = 4;

  return (
    <ScrollView style={CommonStyles.container}>
      <DetailAppBarComponent
        title={`Referrals(${count})`}
        navigation={navigation}
      />
      <DividerComponent />
      <View style={CommonStyles.scrollViewContainer}>
        <PaymentListComponent
          title="Naing"
          description="Mar 4,2024"
          onPress={() => {}}
          dividerShown={false}
        />
        <PaymentListComponent
          title="Su"
          description="Mar 4,2024"
          onPress={() => {}}
          dividerShown={false}
        />
        <PaymentListComponent
          title="Aye"
          description="Mar 4,2024"
          onPress={() => {}}
          dividerShown={false}
        />
        <PaymentListComponent
          title="Yu"
          description="Mar 4,2024"
          onPress={() => {}}
          dividerShown={false}
        />
      </View>
    </ScrollView>
  );
};

export default Referrals;

const styles = StyleSheet.create({});
