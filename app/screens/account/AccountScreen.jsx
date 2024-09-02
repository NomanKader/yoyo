import React, {useState} from 'react';
import {Alert, Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import {CommonStyles} from '../../style/CommonStyles';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import AccountSettingListComponent from '../../components/List/AccountSettingListComponent';
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent';
import profileImage from '../../assets/icons/profileImage.png';
import profileIcon from '../../assets/icons/profileIcon.png';
import settingIcon from '../../assets/icons/settingIcon.png';
import galleryIcon from '../../assets/icons/galleryIcon.png';
import rightArrowIcon from '../../assets/icons/rightArrowIcon.png';
import accountSettings from '../../config/accountSettingList';
import AccessTokenService from '../../helper/AccessTokenService';

export default function AccountScreen({navigation}) {
  // State to manage the visibility of the bottom sheet
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  // List of account settings


  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {/* Header and Profile Section */}
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent
          title={'Account'}
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
      <View style={styles.settingsListContainer}>
        {accountSettings.map((setting, index) => (
          <>
            <AccountSettingListComponent
              key={index}
              icon={setting.icon}
              header={setting.header}
              subheader={setting.subheader}
              onPress={() => {
                if (setting.header === 'Profile Settings') {
                  // Show bottom sheet when "Profile Settings" is clicked
                  setBottomSheetVisible(true);
                } else if (setting.navigateTo === 'Logout') {
                  Alert.alert(
                    'Confirm Logout',
                    'Are you sure you want to log out?',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {
                        text: 'Logout',
                        onPress: () => [
                          AccessTokenService._ClearKeyChainData(),
                          navigation.navigate('AuthStack', {
                            screen: 'LoginScreen',
                          }),
                        ],
                      },
                    ],
                  );
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

      {/* Bottom Sheet Component */}
      <BottomSheetComponent
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        title="Profile Settings"
        snapPoints={['70%', '80%']}>
        {/* Children of the bottom sheet */}
        <AccountSettingListComponent
          key={1}
          icon={profileIcon} // Example icon
          header="Manage Roles"
          subheader="Add & Remove user roles"
          onPress={() =>
            navigation.navigate('AppStack', {screen: 'ManageRoleScreen'})
          }
        />
        <AccountSettingListComponent
          key={2}
          icon={settingIcon} // Example icon
          header="Basic Details"
          subheader="Edit your basic hotel admin info easily"
          onPress={() =>
            navigation.navigate('AppStack', {
              screen: 'BasicDetailScreen',
              params: {
                hotelName:'A Hotel',
                email: 'user@example.com', // Replace with actual email value
                phoneNumber: '1234567890', // Replace with actual phone number value
                pin: '1234', // Replace with actual pin value
                role: 'Admin', // Replace with actual role value
              },
            })
          }
        />
        <AccountSettingListComponent
          key={3}
          icon={galleryIcon} // Example icon
          header="Update Pictures"
          subheader="Edit your hotel pictures easily"
          onPress={() =>
            navigation.navigate('AppStack', {
              screen: 'UploadPictureScreen',
              params: {
                photo1:'https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=',
                photo2: 'https://hospitalityinsights.ehl.edu/hubfs/Imported_Blog_Media/Hotel-design.jpg',
                photo3: 'https://media.istockphoto.com/id/1357529812/photo/digitally-generated-image-of-a-bedroom-interiors-with-minimal-furniture.jpg?s=612x612&w=0&k=20&c=QEQqZHCDDDxovPvKPhuefgPTqqsPLrLm8OgLIKD0m6k=',
                photo4: 'https://www.decorpot.com/images/2016633195top-15-beautiful-and-luxury-bedroom-interior-design-ideas-2023.jpg', // Replace with actual pin value                
              },
            })
          }
        />
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
  settingsListContainer: {
    // Add any needed styles here
    // paddingHorizontal:20
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
