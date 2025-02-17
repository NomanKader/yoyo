import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import SelectTabComponent from '../../components/Tab/SelectTabComponent';
import theme from '../../style/colors';
import notiIcon1 from '../../assets/icons/notiIcon1.png';
import notiIcon2 from '../../assets/icons/notiIcon2.png';
import notiIcon3 from '../../assets/icons/notiIcon3.png';
import notiIcon4 from '../../assets/icons/notiIcon4.png';

const TABS = ['Notifications', 'Messages'];
const icons = [notiIcon1, notiIcon2, notiIcon3];

const notificationsData = [
  {
    id: '1',
    header: '32 new listings near your location',
    subHeader: '20 minutes ago',
    icon: notiIcon1,
  },
  {
    id: '2',
    header: 'You request has been processed',
    subHeader: '20 minutes ago',
    icon: notiIcon1,
  },
  {
    id: '3',
    header: 'You have saved 2 items',
    subHeader: 'Yesterday',
    icon: notiIcon2,
  },
  {
    id: '4',
    header: 'New deals available',
    subHeader: 'Yesterday',
    icon: notiIcon3,
  },
];

const messagesData = [
  {
    id: '1',
    header: 'AungLay',
    message: 'I am very sorry, but the room has already been taken.',
    subHeader: '5 minutes ago',
    icon: notiIcon4,
  },
];

const ApartmentActivityScreen = () => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <View style={styles.container}>
      <SelectTabComponent
        tabs={TABS}
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />
      <FlatList
        data={
          selectedTab === 'Notifications' ? notificationsData : messagesData
        }
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>
          selectedTab === 'Notifications' ? (
            <CustomNotificationMessageCard
              header={item.header}
              subHeader={item.subHeader}
              icon={item.icon}
            />
          ) : (
            <CustomMessageCard
              header={item.header}
              subHeader={item.subHeader}
              message={item.message}
              icon={item.icon}
            />
          )
        }
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default ApartmentActivityScreen;

export const CustomNotificationMessageCard = ({header, subHeader, icon}) => {
  return (
    <View style={styles.card}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>{header}</Text>
        <Text
          style={[
            styles.subHeaderText,
            {marginTop: header.length > 40 ? 0 : 20},
          ]}>
          {subHeader}
        </Text>
      </View>
    </View>
  );
};
export const CustomMessageCard = ({header, message, subHeader, icon}) => {
  return (
    <View style={styles.card}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>{header}</Text>
        <Text style={[styles.subHeaderText,{fontSize:17}]}>{message}</Text>
        <Text style={[styles.subHeaderText]}>{subHeader}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.backgroundColor,
  },
  flatListContainer: {
    paddingTop: 20,
  },
  card: {
    width: '100%',
    height: 83,
    alignSelf: 'center',
    backgroundColor: theme.colors.textLight,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.bottomUnselectedColor,
  },
  subHeaderText: {
    fontSize: 14,
    color: theme.colors.subHeaderText,
  },
});
