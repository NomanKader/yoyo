import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For icons
import theme from '../../style/colors';
import DividerComponent from '../../components/Divider/DividerComponent';
import PaymentListComponent from '../../components/List/PaymentListComponent';

const Account = ({navigation}) => {
  const user = {
    name: 'Tun Tun',
    email: 'tuntun@gmail.com',
  };

  const menuItems = [
    {
      id: '1',
    },
    {
      id: '2',
      title: 'Notifications',
      description: 'Receive notifications from hotels',
      icon: 'bell',
      navigateTo: 'Notifications',
    },
    {
      id: '3',
      title: 'Affiliate and Wallet',
      description: 'Manage your affiliate and wallet',
      icon: 'credit-card',
      navigateTo: 'AffiliateWallet',
    },
    {
      id: '4',
      title: 'About the App',
      description: 'Reach out to customer service anytime',
      icon: 'info',
      navigateTo: 'AboutApp',
    },
    {
      id: '5',
      title: 'Logout',
      description: 'Just want to rest and be back!',
      icon: 'log-out',
      navigateTo: 'Logout',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.topTitle}>Account</Text>
      <DividerComponent />
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://via.placeholder.com/100', // Replace with user's profile picture
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      {/* Menu Items */}
      <FlatList
        ListHeaderComponentStyle={styles.menuList}
        ListHeaderComponent={
          <>
            <PaymentListComponent
              icon="settings"
              title="Account Settings"
              description="Update your user details instantly"
              onPress={() =>
                navigation.navigate('AppStack', {
                  screen: 'AccountSettingScreen',
                })
              }
            />

            <PaymentListComponent
              icon="bell"
              title="Notifications"
              description="Receive notifications from hotels"
              onPress={() =>
                navigation.navigate('AppStack', {
                  screen: 'NotificationsScreen',
                })
              }
            />

            <PaymentListComponent
              icon="credit-card"
              title="Affiliate and Wallet"
              description="Manage your affiliate and wallet"
              onPress={() =>
                navigation.navigate('AppStack', {
                  screen: 'NotificationsScreen',
                })
              }
            />

            <PaymentListComponent
              icon="info"
              title="About the App"
              description="Reach out to customer service anytime"
              onPress={() =>
                navigation.navigate('AppStack', {
                  screen: 'NotificationsScreen',
                })
              }
            />

            <PaymentListComponent
              icon="log-out"
              title="Logout"
              description="Just want to rest and be back!"
              onPress={() =>
                navigation.navigate('AppStack', {
                  screen: 'NotificationsScreen',
                })
              }
            />
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  topTitle: {
    marginLeft: 20,
    fontSize: 20,
    color: theme.colors.textDark,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: theme.colors.gridColor, // Placeholder color
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.textGray,
    marginTop: 5,
  },
  menuList: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textGray,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  menuDescription: {
    fontSize: 12,
    color: theme.colors.textDarkGray,
  },
});

export default Account;
