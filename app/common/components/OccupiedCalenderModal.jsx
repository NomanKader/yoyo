import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OccupiedCalendarModal = ({visible, onClose, occupiedDates}) => {
  const today = new Date().toISOString().split('T')[0];

  const getMarkedDates = (dates = []) => {
    const marks = {};

    // Mark all occupied dates
    dates.forEach(date => {
      marks[date] = {
        customStyles: {
          container: {
            backgroundColor: '#F87171',
            borderRadius: 100,
          },
          text: {
            color: '#fff',
            fontWeight: 'bold',
          },
        },
        disableTouchEvent: true,
      };
    });

    // Highlight today if not occupied
    if (!dates.includes(today)) {
      marks[today] = {
        customStyles: {
          text: {
            color: '#22c55e',
            fontWeight: 'bold',
          },
        },
      };
    }

    return marks;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Vacancy Calendar</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Calendar */}
          <Calendar
            current={today}
            markingType="custom"
            markedDates={getMarkedDates(occupiedDates)}
            hideExtraDays={true}
            theme={{
              arrowColor: '#DC2626',
              textDayFontWeight: '400',
              todayTextColor: '#22c55e',
            }}
            onDayPress={() => {}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default OccupiedCalendarModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
