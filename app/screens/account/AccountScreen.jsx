import React, {useState} from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {CommonStyles} from '../../style/CommonStyles';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import AccountSettingListComponent from '../../components/List/AccountSettingListComponent';
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent';
import profileImage from '../../assets/icons/profileImage.png';
import rightArrowIcon from '../../assets/icons/rightArrowIcon.png';
import accountSettings from '../../config/accountSettingList';
import AccessTokenService from '../../helper/AccessTokenService';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';

export default function AccountScreen({navigation}) {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  // Show Bottom Sheet when "Logout" is clicked
  const handleLogoutPress = () => {
    AccessTokenService._ClearKeyChainData();
    navigation.navigate('AuthStack', {screen: 'LoginScreen'});
    setBottomSheetVisible(false);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => {
            // Handle delete account logic here
            Alert.alert(
              'Account Deleted',
              'Your account has been deleted successfully.',
            );
            setBottomSheetVisible(false);
          },
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {/* Header and Profile Section */}
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent
          title="Account"
          onMorePress={() => Alert.alert('Coming Soon')}
          navigation={navigation}
          hideBackIcon={true}
        />
        <DividerComponent />
        <View style={styles.profileContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={CommonStyles.header}>Hotel Admin</Text>
          <Text style={CommonStyles.subHeader}>ahotel@gmail.com</Text>
        </View>
        <DividerComponent />
      </View>

      {/* Account Settings List Section */}
      <View>
        {accountSettings.map((setting, index) => (
          <>
            <AccountSettingListComponent
              key={index}
              icon={setting.icon}
              header={setting.header}
              subheader={setting.subheader}
              onPress={() => {
                if (setting.navigateTo === 'Logout') {
                  setBottomSheetVisible(true);
                } else {
                  navigation.navigate(setting.navigateTo);
                }
              }}
              rightArrowIcon={rightArrowIcon}
            />
            <DividerComponent />
          </>
        ))}
      </View>

      {/* Bottom Sheet for Logout and Delete Account */}
      <BottomSheetComponent
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        title="More Actions"
        snapPoints={['25%', '50%']}>
        {/* Logout and Delete Account Buttons */}
        <View style={styles.bottomSheetContent}>
          <DefaultButtonComponent
            title={'Logout'}
            backgroundColor={theme.colors.primary}
            color={theme.colors.textLight}
            onPress={() => handleLogoutPress()}
          />
          <DefaultButtonComponent
            title={'Delete Account'}
            backgroundColor={theme.colors.textLightGray}
            color={theme.colors.textDark}
            onPress={() => handleDeleteAccount()}
          />
        </View>
      </BottomSheetComponent>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subheaderText: {
    fontSize: 16,
    color: '#666',
  },
});
