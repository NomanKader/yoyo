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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const BottomSheetComponent = ({ isVisible, onClose, title, children, snapPoints: customSnapPoints }) => {
  const bottomSheetModalRef = useRef(null);

  // Set default snap points to ['40%', '60%'] if none are provided
  const snapPoints = useMemo(() => customSnapPoints || ['40%', '60%'], [customSnapPoints]);

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
            pressBehavior="none"
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
          <TouchableWithoutFeedback onPress={()=>onClose()}>
          <View style={CommonStyles.bottomSheet.bottomSheetItem}>
            {children}
          </View>
          </TouchableWithoutFeedback>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BottomSheetComponent;
