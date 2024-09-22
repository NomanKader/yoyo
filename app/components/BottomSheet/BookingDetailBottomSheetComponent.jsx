import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import DividerComponent from '../../components/Divider/DividerComponent';
import cancelIcon from '../../assets/icons/cancelIcon.png';
import viewIcon from '../../assets/icons/viewIcon.png';
import editIcon from '../../assets/icons/editIcon.png';
import rightArrowIcon from '../../assets/icons/rightArrowIcon.png';
import theme from '../../style/colors';
import { CommonStyles } from '../../style/CommonStyles';
import ProfileBottomSheetComponent from './ProfileBottomSheetComponent';
import BottomSheetComponent from './BottomSheetComponent';
import DropdownPickerComponent from '../Dropdown/DropdownPickerComponent';
import DefaultButtonComponent from '../Button/DefaultButtonComponent';
import { useNavigation } from '@react-navigation/native';

const BookingDetailBottomSheetComponent = ({ isVisible, onClose, style }) => {
  const bottomSheetModalRef = useRef(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isStatusVisible, setIsStatusVisible] = useState(false); // State to manage Booking Status BottomSheet visibility
  const snapPoints = useMemo(() => ['40%', '60%'], []);
  const navigation=useNavigation();

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

  const handleViewCustomerDetails = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsProfileVisible(true);
  };

  const handleEditNumberOfDays = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsEditVisible(true);
  };

  const handleChangeBookingStatus = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsStatusVisible(true);
  };

  const handleProfileClose = () => {
    setIsProfileVisible(false);
  };

  const handleEditClose = () => {
    setIsEditVisible(false);
  };

  const handleStatusClose = () => {
    setIsStatusVisible(false);
  };

  const [daysOpen, setDaysOpen] = useState(false);
  const [daysValue, setDaysValue] = useState(null);
  const [daysItems, setDaysItems] = useState([
    { label: '1 Day', value: '1' },
    { label: '2 Days', value: '2' },
    { label: '3 Days', value: '3' },
    { label: '4 Days', value: '4' },
    { label: '5 Days', value: '5' }
  ]);

  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(null);
  const [statusItems, setStatusItems] = useState([
    { label: 'Unpaid', value: 'unpaid' },
    { label: 'Paid', value: 'paid' },
    { label: 'Cancel', value: 'Cancel' },
    { label: 'Refund Request', value: 'Refund Request' },
  ]);

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
        <BottomSheetView style={[CommonStyles.bottomSheet.contentContainer, style]}>
          <View style={CommonStyles.bottomSheet.bottomSheetHeader}>
            <Text style={CommonStyles.bottomSheet.bottomSheetTitle}>More Actions</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={cancelIcon} style={CommonStyles.bottomSheet.icon} />
            </TouchableOpacity>
          </View>
          <DividerComponent />

          <TouchableOpacity 
            style={CommonStyles.bottomSheet.bottomSheetItem} 
            onPress={handleViewCustomerDetails}
          >
            <View style={CommonStyles.bottomSheet.itemContainer}>
              <Image source={viewIcon} style={CommonStyles.bottomSheet.icon} />
              <Text style={CommonStyles.bottomSheet.bottomSheetItemText}>View Customer Details</Text>
              <Image source={rightArrowIcon} style={CommonStyles.bottomSheet.arrowIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={CommonStyles.bottomSheet.bottomSheetItem}
            onPress={handleEditNumberOfDays}
          >
            <View style={CommonStyles.bottomSheet.itemContainer}>
              <Image source={editIcon} style={CommonStyles.bottomSheet.icon} />
              <Text style={CommonStyles.bottomSheet.bottomSheetItemText}>Edit Number of Days</Text>
              <Image source={rightArrowIcon} style={CommonStyles.bottomSheet.arrowIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={CommonStyles.bottomSheet.bottomSheetItem}
            onPress={handleChangeBookingStatus}
          >
            <View style={CommonStyles.bottomSheet.itemContainer}>
              <Image source={editIcon} style={CommonStyles.bottomSheet.icon} />
              <Text style={CommonStyles.bottomSheet.bottomSheetItemText}>Change Booking Status</Text>
              <Image source={rightArrowIcon} style={CommonStyles.bottomSheet.arrowIcon} />
            </View>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>

      {/* Render the ProfileBottomSheetComponent */}
      <ProfileBottomSheetComponent
        isVisible={isProfileVisible}
        onClose={handleProfileClose}
        name="John Doe"
        email="johndoe@example.com"
      />

      {/* Render the BottomSheetComponent */}
      <BottomSheetComponent
        isVisible={isEditVisible}
        onClose={handleEditClose}
        title="Edit Number of Days"
        children={
          <View>
            <Text style={CommonStyles.infoLabel}>Number of days</Text>
            <DropdownPickerComponent
              open={daysOpen}
              setOpen={setDaysOpen}
              value={daysValue}
              setValue={setDaysValue}
              items={daysItems}
              setItems={setDaysItems}
              placeholder="Select Number of Days"
            />
            <DefaultButtonComponent
              title="Proceed"
              backgroundColor={theme.colors.primary}
              onPress={() => {
                console.log('Proceed with:', daysValue);
                handleEditClose();
              }}
            />
          </View>
        }
      />

      {/* Render the Change Status BottomSheet */}
      <BottomSheetComponent
        isVisible={isStatusVisible}
        onClose={()=>handleStatusClose()}
        title="Change Booking Status"
        snapPoints={["60%","60%"]}
        backdropComponent={() => null}
        children={
          <View>
            <Text style={CommonStyles.infoLabel}>Booking Status</Text>
            <DropdownPickerComponent
              open={statusOpen}
              setOpen={setStatusOpen}
              value={statusValue}
              setValue={setStatusValue}
              items={statusItems}
              setItems={setStatusItems}
              placeholder="Select Booking Status"
            />
            <DefaultButtonComponent
              title="Proceed"
              backgroundColor={theme.colors.primary}
              onPress={() => {
                statusValue === 'Cancel' && (handleStatusClose(), navigation.navigate('AppStack', { screen: 'BookingCancelScreen' }));
              }}              
            />
          </View>
        }
      />
    </BottomSheetModalProvider>
  );
};

export default BookingDetailBottomSheetComponent;
