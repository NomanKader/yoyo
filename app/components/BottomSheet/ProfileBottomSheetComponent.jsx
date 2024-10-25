import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import DividerComponent from '../../components/Divider/DividerComponent';
import cancelIcon from '../../assets/icons/cancelIcon.png';
import profileImage from '../../assets/icons/profileImage.png'; // Replace with your actual profile image path
import callIcon from '../../assets/icons/callIcon.png'; // Replace with your actual call icon path
import theme from '../../style/colors';

const ProfileBottomSheetComponent = ({ isVisible, onClose, style, name, email }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isVisible]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onDismiss={onClose}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView style={[styles.contentContainer, style]}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>Customer Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={cancelIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <DividerComponent />

          <View style={styles.centerContent}>
            <Image source={profileImage} style={styles.profileImage} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <TouchableOpacity>
              <Image source={callIcon} style={styles.callIcon} />
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  icon: {
    width: 30,
    height: 30,
  },
  centerContent: {
    alignItems: 'center', // Center horizontally
    marginTop: 20, // Add some space from the header
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50, // Makes the image round
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color:theme.colors.textDark
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  callIcon: {
    width: 50,
    height: 50,
  },
});

export default ProfileBottomSheetComponent;
