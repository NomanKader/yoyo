import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CloseIcon from '../../assets/icons/closeIcon.svg';
import DefaultButtonComponent from '../Button/DefaultButtonComponent';
import theme from '../../styles/colors';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const FilterWithDateComponent = ({
  modalVisible,
  setModalVisible,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  applyFilter,
  years,
}) => {
  const { t } = useTranslation();
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear(); 

  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  const months = monthNames
    .map((month, index) => ({
      label: t(month),
      value: (index + 1).toString().padStart(2, '0'), 
      disabled: selectedYear === currentYear.toString() && index + 1 > currentMonth, 
    }))
    .filter(month => !month.disabled); 

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.filterBox}>
          {/* Filter Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.filterTitle}>{t('filter')}</Text>
              <Text style={styles.filterSubTitle}>{t('select_month_year')}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <CloseIcon width={18} height={18} />
            </TouchableOpacity>
          </View>

          {/* Month & Year Picker */}
          <View style={styles.pickerContainer}>
            {/* Month Picker */}
            <Picker
              selectedValue={selectedMonth}
              onValueChange={setSelectedMonth}
              style={styles.picker}
            >
              {months.map(({ label, value }) => (
                <Picker.Item key={value} label={label} value={value} />
              ))}
            </Picker>

            {/* Year Picker */}
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => {
                setSelectedYear(itemValue);
                if (itemValue === currentYear.toString() && selectedMonth > currentMonth.toString().padStart(2, '0')) {
                  setSelectedMonth(currentMonth.toString().padStart(2, '0')); // Reset month if future month was selected
                }
              }}
              style={styles.picker}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year.toString()} />
              ))}
            </Picker>
          </View>

          {/* Apply Button */}
          <DefaultButtonComponent title={t('agree')} onPress={applyFilter} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  filterBox: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    padding: 20,
    shadowColor: theme.colors.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.textDark,
  },
  filterSubTitle: {
    textAlign: 'left',
    color: theme.colors.textBlack,
  },
  pickerContainer: {
    flexDirection: 'row',
    marginVertical: 30,
    marginHorizontal: 16,
  },
  picker: {
    width: '50%',
  },
  closeButton: {
    padding: 10,
  },
});

export default FilterWithDateComponent;
