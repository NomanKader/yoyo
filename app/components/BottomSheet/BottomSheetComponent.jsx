import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import DividerComponent from '../Divider/DividerComponent';
import cancelIcon from '../../assets/icons/cancelIcon.png';
import { CommonStyles } from '../../style/CommonStyles';

const BottomSheetComponent = ({ isVisible, onClose, title, children }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '60%'], []);

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
        <BottomSheetView style={CommonStyles.bottomSheet.contentContainer}>
          <View style={CommonStyles.bottomSheet.bottomSheetHeader}>
            <Text style={CommonStyles.bottomSheet.bottomSheetTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={cancelIcon} style={CommonStyles.bottomSheet.icon} />
            </TouchableOpacity>
          </View>
          <DividerComponent />
          <View style={CommonStyles.bottomSheet.bottomSheetItem}>
            {children}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
export default BottomSheetComponent;
