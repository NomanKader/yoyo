import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../style/colors';
import qrCode from '../../assets/icons/qrCode.png'; // Import the QR code image

const AppBarComponent = ({ title, navigation, searchData, type }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.iconContainer}>
          {title === 'Bookings' && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('AppStack',{screen:'QRScanScreen'})}
            >
              <Image source={qrCode} style={styles.iconImage} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate('AppStack', {
                screen: 'SearchScreen',
                params: { searchData: searchData, type: type },
              })
            }
          >
            <Icon name="search" size={15} color={theme.icon.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('AppStack', { screen: title==='Bookings'?'BookingRoomCategoryScreen':'RoomCategoryCreateScreen' })}
          >
            <Icon name="plus" size={15} color={theme.icon.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {    
    elevation: 4, // Add shadow/elevation to the container
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.textDark,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
    padding: 12,
    backgroundColor: theme.colors.textLight, // Background color for better visibility
    borderRadius: 60,
    elevation: 4, // Add shadow/elevation to the icons
  },
  iconImage: {
    width: 15, // Adjust the width of the image
    height: 15, // Adjust the height of the image
    resizeMode: 'contain', // Ensure the image fits within the bounds without distortion
  },
});

export default AppBarComponent;
