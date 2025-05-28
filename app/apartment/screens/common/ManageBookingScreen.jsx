import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HeaderComponent from '../../components/Divider/HeaderComponent';

const bookingsData = [
  {
    id: '1',
    customerName: 'Moe Thandar',
    roomType: 'Skyview Residence',
    bookingDate: '30 Apr 2025',
    paymentScreenshot: require('../../assets/images/payment.png'),
    phone: '09-123456789',
    email: 'moe@example.com',
    status: 'Pending',
  },
];

export default function ManageBookingScreen({navigation}) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  
  const handleReject = () => {
    if (rejectReason.trim()) {
      console.log('Rejected with reason:', rejectReason);
      resetModal();
    }
  };

  const handleApprove = () => {
    console.log('Approved booking:', selectedBooking.customerName);
    resetModal();
  };

  const resetModal = () => {
    setSelectedBooking(null);
    setRejectReason('');
    setShowRejectReason(false);
    setModalVisible(false);
  };

  const renderBooking = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedBooking(item);
        setRejectReason('');
        setShowRejectReason(false);
        setModalVisible(true); // ✅ Open modal
      }}>
      <Text style={styles.name}>{item.customerName}</Text>
      <Text>{item.roomType}</Text>
      <Text>Booking Date: {item.bookingDate}</Text>
      <View style={styles.statusTag}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent onPress={()=> navigation.goBack()} title={'Manage Booking'} />
      <FlatList
        data={bookingsData}
        renderItem={renderBooking}
        keyExtractor={item => item.id}
      />

      {/* Modal for details */}
      <Modal visible={modalVisible} animationType="slide" transparent>        
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <ScrollView>
                <Text style={styles.modalTitle}>Booking Detail</Text>

                <Text style={styles.label}>Customer Name</Text>
                <Text>{selectedBooking?.customerName}</Text>

                <Text style={styles.label}>Email</Text>
                <Text>{selectedBooking?.email}</Text>

                <Text style={styles.label}>Phone</Text>
                <Text>{selectedBooking?.phone}</Text>

                <Text style={styles.label}>Room Type</Text>
                <Text>{selectedBooking?.roomType}</Text>

                <Text style={styles.label}>Booking Date</Text>
                <Text>{selectedBooking?.bookingDate}</Text>

                <Text style={styles.label}>Payment Screenshot</Text>
                <Image
                  source={selectedBooking?.paymentScreenshot}
                  style={styles.screenshot}
                />

                {showRejectReason ? (
                  <>
                    <Text style={styles.label}>Reject Reason</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter reason"
                      value={rejectReason}
                      onChangeText={setRejectReason}
                    />
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {backgroundColor: '#DC2626'},
                      ]}
                      onPress={handleReject}>
                      <Text style={styles.buttonText}>Submit Reject</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {backgroundColor: '#22C55E'},
                      ]}
                      onPress={handleApprove}>
                      <Text style={styles.buttonText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {backgroundColor: '#DC2626'},
                      ]}
                      onPress={() => setShowRejectReason(true)}>
                      <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <TouchableOpacity onPress={resetModal} style={styles.closeIcon}>
                  <Icon name="x" size={24} color="#000" />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>        
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusTag: {
    backgroundColor: '#FACC15',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 5,
  },
  statusText: {
    fontWeight: '600',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  screenshot: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 0.48,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  closeText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 15,
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
});
