import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import { CommonStyles } from '../../style/CommonStyles';
import theme from '../../style/colors';
import { CheckOut } from '../../services/BookingService';

export default function CheckoutScreen({ navigation, route }) {
  const {
    bookingId,
    roomNumber,
    totalExtraCharges = 0,
    customerName = 'Tun Tun',           // fallback demo values
    phone = '09069469010',
    email = 'tuntun@gmail.com',
    roomType = 'Standard King Rooms',
  } = route.params || {};

  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);

  // Demo minibar items – you can load these from API later
  const [items, setItems] = useState([
    { id: 1, name: 'Cola', price: 4000, checked: false },
    { id: 2, name: 'Water Bottle', price: 1000, checked: false },
    { id: 3, name: 'Chang Beer', price: 4000, checked: false },
    { id: 4, name: 'Snacks', price: 2000, checked: false },
  ]);

  const totalRoomCharges = useMemo(
    () =>
      items
        .filter(i => i.checked)
        .reduce((sum, i) => sum + i.price, 0),
    [items],
  );

  const hasMiniBarOrExtra =
    totalRoomCharges > 0 || totalExtraCharges > 0;

  const handleSubmit = async () => {
    setShowCheckoutConfirm(false); // close modal first

    try {
      const response = await CheckOut(bookingId); // 👈 make sure to pass bookingId or required params

      if (response?.success) {
        navigation.navigate("SuccessScreen", {
          header: "Check-out Successful!",
          subheader: "The customer has checked out successfully.",
          nextScreen: "TabScreen",
          nextScreenParams: {},
          icon: null,
          isShowingIllustration: true,
          buttonText: "Back to home",
          color: theme.colors.primary,
        });
      } else {
        Alert.alert("Info", response?.message || "Failed to check out.");
      }
    } catch (error) {
      console.log("Checkout error:", error);
      Alert.alert("Error", "Something went wrong while checking out.");
    }
  };


  const confirmCheckout = () => {
    setShowCheckoutConfirm(false);
    // TODO: call your checkout API here
    navigation.goBack();
  };

  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent title="Check out" navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Room + Customer info card */}
        <View style={styles.infoCard}>
          <Text style={styles.roomTitle}>
            Room {roomNumber || '—'}
          </Text>
          <Text style={styles.roomSubtitle}>{roomType}</Text>

          <Text style={styles.blockTitle}>Customer Info</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Customer Name</Text>
            <Text style={styles.fieldValue}>{customerName}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Phone  No</Text>
            <Text style={styles.fieldValue}>{phone}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <Text style={styles.fieldValue}>{email}</Text>
          </View>
        </View>

        {/* Mini bar usage & extra charges section */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.blockTitle}>
            Mini bar usage and extra charges
          </Text>

          {hasMiniBarOrExtra ? (
            <View style={styles.chargesBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Mini bar total</Text>
                <Text style={styles.summaryValue}>
                  {totalRoomCharges} MMK
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Extra charges total</Text>
                <Text style={styles.summaryValue}>
                  {totalExtraCharges} MMK
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, styles.summaryTotalLabel]}>
                  Grand total
                </Text>
                <Text style={[styles.summaryValue, styles.summaryTotalValue]}>
                  {totalRoomCharges + totalExtraCharges} MMK
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyBox}>
              <View style={styles.emptyIconCircle}>
                <Text style={styles.emptyIconText}>!</Text>
              </View>
              <Text style={styles.emptyText}>
                There is not mini bar usage or extra{'\n'}
                charges found!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom button */}
      <View style={styles.bottomButtonWrapper}>
        <DefaultButtonComponent
          title="Check Out"
          backgroundColor={theme.colors.primary}
          onPress={handleSubmit}
        />
      </View>

      {/* Alert-style confirmation modal */}
      <Modal
        visible={showCheckoutConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCheckoutConfirm(false)}
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>
              Are you sure to proceed check out?
            </Text>

            <Text style={styles.alertMessage}>
              Note : Please check carefully mini bar usage and extra
              charges before check out!
            </Text>

            <View style={styles.alertButtonsRow}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmCheckout}
              >
                <Text style={styles.confirmButtonText}>Yes, sure</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCheckoutConfirm(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  /* Room + customer card */
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,

  },
  roomTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0B1120',
    marginBottom: 4,
  },
  roomSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  blockTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  fieldLabel: {
    flex: 1,
    fontSize: 12,
    color: '#4B5563',
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },

  /* Mini bar + extra charges */
  sectionWrapper: {
    marginTop: 4,
  },
  chargesBox: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#4B5563',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 6,
  },
  summaryTotalLabel: {
    fontWeight: '700',
  },
  summaryTotalValue: {
    fontSize: 14,
    color: '#1D4ED8',
  },

  /* Empty state box */
  emptyBox: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emptyIconText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7280',
  },
  emptyText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },

  /* Bottom button */
  bottomButtonWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  /* Alert styles */
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  alertButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#3E7BFA',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
});
