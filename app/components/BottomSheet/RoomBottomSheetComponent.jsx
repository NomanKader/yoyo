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
import editIcon from '../../assets/icons/editIcon.png';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import rightArrowIcon from '../../assets/icons/rightArrowIcon.png';

const RoomBottomSheetComponent = ({ isVisible, onClose, style }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['30%', '50%'], []);

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
        onDismiss={onClose} // Ensure onClose is called when the BottomSheet is dismissed
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close" // Ensures the BottomSheet closes when backdrop is pressed
          />
        )}
      >
        <BottomSheetView style={[styles.contentContainer, style]}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>More Actions</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={cancelIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <DividerComponent />
          <TouchableOpacity style={styles.bottomSheetItem}>
            <View style={styles.itemContainer}>
              <Image source={editIcon} style={styles.icon} />
              <Text style={styles.bottomSheetItemText}>Edit Room</Text>
              <Image source={rightArrowIcon} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomSheetItem}>
            <View style={styles.itemContainer}>
              <Image source={deleteIcon} style={styles.icon} />
              <Text style={styles.bottomSheetItemText}>Delete Room</Text>
              <Image source={rightArrowIcon} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,   
    height: 300 
  },
  bottomSheet: {
    zIndex: 2, // Ensure BottomSheet appears above the overlay
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
    marginLeft: 10,
    marginBottom: 5
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5
  },
  arrowIcon: {
    width: 7,
    height: 12,
    marginLeft: 'auto',
  },
  bottomSheetItem: {
    paddingVertical: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
  },
  bottomSheetItemText: {
    fontSize: 16,
    marginLeft: 10, 
    marginBottom:5   
  },
  deleteBottomSheetItemText: {
    fontSize: 16,
    marginLeft: 10,   
    marginBottom: 30 
  },
});

export default RoomBottomSheetComponent;
