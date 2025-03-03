import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import DatePicker from 'react-native-date-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTranslation} from 'react-i18next';
import {BlurView} from '@react-native-community/blur';
import {CommonStyles} from '../../styles/CommonStyles';
import theme from '../../styles/colors';
import CloseIcon from '../../assets/icons/filterCloseIcon.svg';

const FormikDateTimeSelectBox = ({
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
}) => {
  const {t} = useTranslation();

  const formatThaiDate = (date) => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() + 543).toString();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    const period = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    return `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
  };
  

  const hasError =
    formikProps?.touched?.[formikKey] && formikProps?.errors?.[formikKey];

  const [isVisible, setIsVisible] = useState(false);
  const [localValue, setLocalValue] = useState(value || new Date());
  const [localTime, setLocalTime] = useState(value ? new Date(value) : new Date(),
);

  const openDatePicker = () => {
    if (!showModal) setIsVisible(true);
  };

  const closeDatePicker = () => {
    if (!showModal) setIsVisible(false);
    onCloseModal && onCloseModal();
  };

  const handleConfirm = () => {
    const finalDate = new Date(localValue);
    finalDate.setHours(localTime.getHours());
    finalDate.setMinutes(localTime.getMinutes());

    closeDatePicker();

    if (formikProps) {
      formikProps.setFieldValue(formikKey, finalDate); 
    } else {
      setLocalValue(finalDate);
    }

    onConfirm && onConfirm(finalDate);
  };

  const isModalVisible = showModal || isVisible;

  useEffect(() => {
    if (value) {
      const initialTime = new Date(value);
      setLocalTime(initialTime);
      setLocalValue(new Date(value));
    }
  }, [value]);

  return (
    <>
      {showTrigger && (
        <View
          style={[CommonStyles.inputContainer, hasError && CommonStyles.error]}>
          <Text style={[CommonStyles.formLabel, {color: labelColor}]}>
            {label}
            {required && <Text style={styles.asterisk}> *</Text>}
          </Text>
          <TouchableOpacity
            onPress={openDatePicker}
            style={CommonStyles.formInput}>
            <Text
              style={[
                CommonStyles.inputValueText,
                !value && CommonStyles.inputValuePlaceholder,
              ]}>
              {value ? formatThaiDate(new Date(value)) : t('select_date')}
            </Text>
            {calenderIcon ? (
              calenderIcon
            ) : (
              <FontAwesome
                name="calendar"
                size={20}
                color="#007AFF"
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
          {hasError && (
            <Text style={styles.errorText}>
              {formikProps.errors[formikKey]}
            </Text>
          )}
        </View>
      )}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeDatePicker}>
        <View style={styles.modalOverlay}>
          <BlurView
            style={styles.blurBackground}
            blurType="xLight"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>{pickerModalTitle}</Text>
                <Text style={styles.subTitle}>{pickerModalSubTitle}</Text>
              </View>
              <TouchableOpacity
                onPress={closeDatePicker}
                style={styles.closeIconClick}>
                <CloseIcon width={17} height={17} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginStart:"25%",
              }}>
              <DatePicker
                date={localValue || new Date()}
                mode={mode}
                onDateChange={setLocalValue}
                locale="eng"
                maximumDate={new Date()}
                theme="light"
              />
              <DatePicker
                date={localTime || new Date()}
                mode="time"
                onDateChange={setLocalTime}
                locale="eng"
                theme="light"
              />
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}>
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
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
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

export default FormikDateTimeSelectBox;
