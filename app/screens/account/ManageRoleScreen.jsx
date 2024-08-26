import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import DetailAppBarComponent from "../../components/AppBar/DetailAppBarComponent";
import { CommonStyles } from "../../style/CommonStyles";
import addIcon from '../../assets/icons/addIcon.png';
import profileIcon from '../../assets/icons/profileIcon.png';
import DividerComponent from "../../components/Divider/DividerComponent";
import AccountSettingListComponent from "../../components/List/AccountSettingListComponent";
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent'; // Import BottomSheetComponent
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
;

export default function ManageRoleScreen({ navigation }) {
  const [roles, setRoles] = useState([]); // State to hold the roles data
  const [loading, setLoading] = useState(true); // State to handle loading indicator
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false); // State for BottomSheet visibility
  const [selectedRole, setSelectedRole] = useState(null); // State to hold selected role data

  useEffect(() => {
    // Simulate data fetching
    const fetchRoles = async () => {
      setLoading(true);
      // Simulating a network request with a delay
      setTimeout(() => {
        const fakeRoles = [
          { id: 1, header: 'Admin', subheader: 'admin@gmail.com', icon: profileIcon },
          { id: 2, header: 'Editor', subheader: 'editor@gmail.com', icon: profileIcon },
          { id: 3, header: 'Viewer', subheader: 'viewer@gmail.com', icon: profileIcon },
        ];
        setRoles(fakeRoles);
        setLoading(false);
      }, 500); // 0.5-second delay
    };

    fetchRoles();
  }, []);

  const handlePress = (role) => {
    setSelectedRole(role); // Set the selected role data
    setIsBottomSheetVisible(true); // Show the BottomSheet
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent 
          title={'Manage Roles'} 
          navigation={navigation} 
          onMorePress={() => navigation.navigate('AppStack', { screen: 'AddUserScreen' })} 
          icon={addIcon} 
        />
        <DividerComponent />

        {loading ? ( // Show loading indicator while fetching roles
          <ListSkeletonComponent />
        ) : (
          <View style={{ marginLeft: -25 }}>
            {roles.map((role) => (
              <View key={role.id}>
                <AccountSettingListComponent
                  icon={role.icon}
                  header={role.header}
                  subheader={role.subheader}
                  onPress={() => handlePress(role)} // Call handlePress with the role data
                />
                <DividerComponent />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Render BottomSheetComponent */}
      {selectedRole && (
        <BottomSheetComponent
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}
          role={selectedRole}
          snapPoints={['50%', '80%']}
        >
            <View style={{marginLeft:-25}}>
            <AccountSettingListComponent
                    key={1}
                    icon={profileIcon} // Example icon
                    header="Manage Roles"
                    subheader="Add & Remove user roles"
                    onPress={() => navigation.navigate('AppStack',{screen:'ManageRoleScreen'})}
                />
                </View>
                <DividerComponent/>
                <View>
                    <Text style={CommonStyles.subHeader}>Phone number</Text>
                    <Text style={CommonStyles.subHeader}>09969119949</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{flex:1,marginTop:12,marginRight:12}}>
                    <DefaultButtonComponent title={"Delete"} backgroundColor={theme.colors.error} onPress={()=>console.log("")}/>
                        </View>
                        <View style={{flex:1,marginTop:12,marginRight:12}}>
                    <DefaultButtonComponent title={"Edit account"} backgroundColor={theme.colors.primary} onPress={()=>console.log("")}/>
                        </View>
                </View>
        </BottomSheetComponent>
      )}
    </ScrollView>
  );
}
