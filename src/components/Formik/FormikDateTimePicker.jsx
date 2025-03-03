import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, Keyboard, Platform} from 'react-native';
import DatePicker from 'react-native-date-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTranslation} from 'react-i18next';
import {CommonStyles} from '../../styles/CommonStyles';
import theme from '../../styles/colors';
import CloseIcon from '../../assets/icons/filterCloseIcon.svg';
// handling ios real device issue
const FormikDateTimePicker = ({
  width = "100%",
  label,
  labelColor = theme.colors.textDark,
  value,
  showTrigger = true,
  showModal = false,
  onCloseModal,
  onConfirm,
  formikProps = null,
  formikKey, 
  calenderIcon,
  pickerModalTitle,
  pickerModalSubTitle,
  required = false,
  mode = 'date',
  isFutureSelectable = false,
}) => {
  const {t} = useTranslation();

  const formatThaiDate = date => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() + 543).toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (mode === 'datetime') {
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } else if (mode === 'time') {
      return `${hours}:${minutes}`;
    }
    return `${day}/${month}/${year}`;
  };

  const hasError = formikProps?.touched?.[formikKey] && formikProps?.errors?.[formikKey];

  const [isVisible, setIsVisible] = useState(false);
  const [localValue, setLocalValue] = useState(value ? new Date(value) : new Date());

  const openDatePicker = () => {
    Keyboard.dismiss();
    if (!showModal) setIsVisible(true);
  };

  const closeDatePicker = () => {
    if (!showModal) setIsVisible(false);
    onCloseModal && onCloseModal();
  };

  const handleConfirm = date => {
    if (date) {
      if (formikProps) {
        formikProps.setFieldValue(formikKey, date);
      } else {
        setLocalValue(date);
      }
      onConfirm && onConfirm(date);
    }
    closeDatePicker();
  };

  const isModalVisible = showModal || isVisible;

  return (
    <>
      {showTrigger && (
        <View style={[CommonStyles.inputContainer, { width }, hasError && CommonStyles.error]}>
          <Text style={[CommonStyles.formLabel, {color: labelColor}]}>
            {label}
            {required && <Text style={styles.asterisk}> *</Text>}
          </Text>
          <TouchableOpacity onPress={openDatePicker} style={CommonStyles.formInput}>
            <Text style={[
                CommonStyles.inputValueText,
                !value && CommonStyles.inputValuePlaceholder,
              ]}>
              {value ? formatThaiDate(new Date(value)) : t('select_date')}
            </Text>
            {calenderIcon ? (
              calenderIcon
            ) : (
              <FontAwesome name="calendar" size={20} color="#007AFF" style={styles.icon} />
            )}
          </TouchableOpacity>
          {hasError && <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>}
        </View>
      )}
      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={closeDatePicker}>
        <View style={styles.modalOverlay}>
          {/* Custom Blur Effect */}
          <View style={styles.customBlur} />

          <View style={styles.modalContent}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>{pickerModalTitle}</Text>
                <Text style={styles.subTitle}>{pickerModalSubTitle}</Text>
              </View>
              <TouchableOpacity onPress={closeDatePicker} style={styles.closeIconClick}>
                <CloseIcon width={17} height={17} />
              </TouchableOpacity>
            </View>
            <DatePicker
              date={localValue}
              mode={mode}
              onDateChange={setLocalValue}
              locale="en"
              {...(isFutureSelectable ? {} : { maximumDate: new Date() })} 
            />
            <TouchableOpacity style={styles.confirmButton} onPress={() => handleConfirm(localValue)}>
              <Text style={styles.confirmText}>{t('confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 12, 12, 0.71)', // Dark transparent background
  },
  customBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)', // Semi-transparent white
    backdropFilter: 'blur(10px)', // Blur effect (Web support)
  },
  modalContent: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 35,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: theme.colors.textDark,
    fontFamily: theme.customfonts.bold,
  },
  subTitle: {
    fontSize: 16,
    color: theme.colors.textDarkGray,
    fontFamily: theme.customfonts.medium,
  },
  closeIconClick: {
    padding: 5,
    marginRight: -5,
  },
  confirmButton: {
    marginTop: 12,
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 16,
    color: theme.colors.white,
    fontFamily: theme.customfonts.bold,
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
  asterisk: {
    color: theme.colors.danger,
  },
});

export default FormikDateTimePicker;
