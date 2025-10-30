import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../style/colors';
import backIcon from '../../assets/icons/backIcon.png';
import qrCode from '../../assets/icons/qrCode.png'; // Import the QR code image
import { CommonStyles } from '../../style/CommonStyles';
import { RoomContext } from '../../context/RoomContext';

const AppBarComponent = ({
  title,
  navigation,
  searchData,
  type,
  showBackIcon = false,
  onPressBack,
  onAddIconPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBackIcon && (
            <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
              <Image source={backIcon} style={styles.backIconImage} />
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        {showBackIcon ? (
          <View style={styles.centerTitle}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        ) : (
          <View style={styles.leftAlignedTitle}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}

        {/* Right Icons */}
        <View style={styles.iconContainer}>
          {title === 'Bookings' && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                navigation.navigate('AppStack', { screen: 'QRScanScreen' })
              }
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
            onPress={() => {
              if (onAddIconPress) {
                onAddIconPress();
              } else {
                navigation.navigate("AppStack", {
                  screen:
                    title === "Bookings"
                      ? "BookingRoomCategoryScreen"
                      : "RoomCategoryCreateScreen",
                });
              }
            }}

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
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 10,
    position: 'relative',
  },
  leftSection: {
    width: 50, // reserve space for back button
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: -1, // ensures it doesn't overlap icon buttons
  },
  leftAlignedTitle: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.textDark,
  },
  backButton: {
    marginRight: 8,
  },
  backIconImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
    padding: 10,
    backgroundColor: theme.colors.textLight,
    borderRadius: 60,
    elevation: 4,
  },
  iconImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});



export default AppBarComponent;
