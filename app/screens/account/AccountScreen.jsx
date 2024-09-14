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
import profileIcon from '../../assets/icons/profileIcon.png';
import settingIcon from '../../assets/icons/settingIcon.png';
import galleryIcon from '../../assets/icons/galleryIcon.png';
import accountSettings from '../../config/accountSettingList';
import AccessTokenService from '../../helper/AccessTokenService';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';

export default function AccountScreen({navigation}) {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

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
    <>
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
                  setSelectedItem(setting.header);
                  if (
                    setting.header === 'Logout' ||
                    setting.header === 'Profile Settings'
                  ) {
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
      </ScrollView>
      {/* Bottom Sheet for Logout and Delete Account */}
      <BottomSheetComponent
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        title={selectedItem}
        snapPoints={['55%', '50%']}>
        {selectedItem === 'Logout' ? (
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
        ) : selectedItem === 'Profile Settings' ? (
          <View style={{padding: 10}}>
            {/* Manage Roles */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AppStack', {screen: 'ManageRoleScreen'})
              }>
              <View style={styles.listItem}>
                <Image source={profileIcon} style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.headerText}>Manage Roles</Text>
                  <Text style={styles.subheaderText}>
                    Add & Remove user roles
                  </Text>
                </View>
                <Image source={rightArrowIcon} style={styles.arrowIcon} />
              </View>
            </TouchableOpacity>

            <DividerComponent />

            {/* Basic Details */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AppStack', {
                  screen: 'BasicDetailScreen',
                  params: {
                    hotelName: "aHotel",
                    email: "ahotel@gmail.com",
                    phoneNumber: "09969119949",
                    pin: "1011",
                    role: 'Admin'                    
                  },
                })
              }>
              <View style={styles.listItem}>
                <Image source={settingIcon} style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.headerText}>Basic Details</Text>
                  <Text style={styles.subheaderText}>
                    Edit your basic hotel admin info easily
                  </Text>
                </View>
                <Image source={rightArrowIcon} style={styles.arrowIcon} />
              </View>
            </TouchableOpacity>

            <DividerComponent />

            {/* Update Pictures */}
            <TouchableOpacity
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
              >
              <View style={styles.listItem}>
                <Image source={galleryIcon} style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.headerText}>Update Pictures</Text>
                  <Text style={styles.subheaderText}>
                    Edit your hotel pictures easily
                  </Text>
                </View>
                <Image source={rightArrowIcon} style={styles.arrowIcon} />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </BottomSheetComponent>
    </>
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
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subheaderText: {
    fontSize: 14,
    color: '#666',
  },
  listItem: {
    flexDirection: 'row', // Row layout for icon, text, and arrow
    alignItems: 'center', // Vertically center icon and text
    justifyContent: 'space-between', // Space between text and arrow
    paddingVertical: 15,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Take up remaining space in the row
    flexDirection: 'column', // Stack header and subheader vertically
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#999',
  },
});
