import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ProfileImage from '../../assets/images/profile.png';
import bookmarkIcon from '../../assets/icons/apartmentTab/bookmarkIcon.png';
import applicationIcon from '../../assets/icons/apartmentTab/applicationIcon.png';
import helpIcon from '../../assets/icons/apartmentTab/helpIcon.png';
import settingIcon from '../../assets/icons/apartmentTab/settingIcon.png';
import logoutIcon from '../../assets/icons/apartmentTab/logoutIcon.png';
import editIcon from '../../assets/icons/apartmentTab/editIcon.png';
import theme from '../../style/colors';
import { useState } from 'react';
import EditProfileScreen from './EditProfileScreen';

export default function ApartmentProfileScreen() {
  const [editing,setEditing]=useState(false);
  return (
    !editing?(
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={ProfileImage}
          style={styles.profileImage}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.name}>Aung Aung</Text>
          <Text style={styles.username}>@aungaung</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton} onPress={()=>setEditing(true)}>
        <Image source={editIcon} style={styles.editIcon} />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Menu Options */}
      <View style={styles.menu}>
        <MenuItem icon={bookmarkIcon} text="Bookmarks" />
        <MenuItem icon={applicationIcon} text="Applications" />
        <MenuItem icon={helpIcon} text="Help" />
        <MenuItem icon={settingIcon} text="Settings" />
        <MenuItem icon={logoutIcon} text="Logout" />
      </View>
    </View>):
    // Edit Profile Screen
    <EditProfileScreen setEditing={setEditing}/>
  );
}

// Menu Item Component (Now Uses Custom Icons)
const MenuItem = ({ icon, text }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.typoInfoColor,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: theme.colors.textLight,
    marginTop: 20,
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
    marginLeft: 20,
  },
  username: {
    fontSize: 14,
    color: theme.colors.textLightGray,
    marginLeft: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  editText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  menu: {
    width: '80%',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    width: 25, // Adjust size as needed
    height: 25, // Adjust size as needed
    resizeMode: 'contain',
  },
  editIcon: {
    width: 22, // Adjust size as needed
    height: 22, // Adjust size as needed
    resizeMode: 'contain',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
});