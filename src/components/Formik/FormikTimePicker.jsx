import React, {useEffect, useState, useMemo, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Keyboard,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {BlurView} from '@react-native-community/blur';
import WheelPicker from '../Picker/WheelPicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import theme from '../../styles/colors';
import CloseIcon from '../../assets/icons/filterCloseIcon.svg';
import {CommonStyles} from '../../styles/CommonStyles';

const FormikTimePicker = ({
  width = '100%',
  label,
  labelColor = theme.colors.textDark,
  value,
  showTrigger = true,
  showModal = false,
  onCloseModal,
  onConfirm,
  formikProps = null,
  formikKey,
  required = false,
  selectedDate,
}) => {
  const {t} = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [localValue, setLocalValue] = useState(value || new Date());
  const prevSelectedDateRef = useRef(selectedDate);

  const hasError = useMemo(
    () => formikProps?.touched?.[formikKey] && formikProps?.errors?.[formikKey],
    [formikProps, formikKey],
  );

  useEffect(() => {
    if (!selectedDate) return;

    const currentDateTime = new Date();
    const selectedDateTime = new Date(selectedDate);

    if (selectedDateTime.toDateString() === currentDateTime.toDateString()) {
      if (
        localValue.getHours() > currentDateTime.getHours() ||
        (localValue.getHours() === currentDateTime.getHours() &&
          localValue.getMinutes() > currentDateTime.getMinutes())
      ) {
        if (prevSelectedDateRef.current !== selectedDate) {
          formikProps?.setFieldValue(formikKey, '');
        }
        setLocalValue(new Date());
      }
    }
    prevSelectedDateRef.current = selectedDate;
  }, [selectedDate, formikProps, formikKey, localValue]);

  const formatTime = date => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const openTimePicker = () => {
    Keyboard.dismiss();
    if (!showModal) setIsVisible(true);
  };

  const closeTimePicker = () => {
    if (!showModal) setIsVisible(false);
    onCloseModal?.();
  };

  const handleConfirm = () => {
    closeTimePicker();
    const formattedTime = formatTime(localValue);
    formikProps?.setFieldValue(formikKey, formattedTime);
    onConfirm?.(formattedTime);
  };

  const hours = useMemo(
    () => Array.from({length: 24}, (_, index) => index),
    [],
  );
  const minutes = useMemo(
    () => Array.from({length: 60}, (_, index) => index),
    [],
  );

  const defaultHour = localValue.getHours();
  const defaultMinute = localValue.getMinutes();
  const isModalVisible = showModal || isVisible;

  return (
    <>
      {showTrigger && (
        <View
          style={[
            CommonStyles.inputContainer,
            {width},
            hasError && CommonStyles.error,
          ]}>
          <Text style={[CommonStyles.formLabel, {color: labelColor}]}>
            {label}
            {required && <Text style={styles.asterisk}> *</Text>}
          </Text>
          <TouchableOpacity
            onPress={openTimePicker}
            style={[CommonStyles.formInput, {alignItems: 'center'}]}>
            <Text
              style={[
                CommonStyles.inputValueText,
                !value && CommonStyles.inputValuePlaceholder,
                {marginBottom: 0},
              ]}>
              {value || t('select_time')}
            </Text>
            <FontAwesome
              name="clock-o"
              size={25}
              color="#007AFF"
              style={styles.icon}
            />
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
        onRequestClose={closeTimePicker}>
        <View style={styles.modalOverlay}>
          <BlurView
            style={styles.blurBackground}
            blurType="xLight"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>{t('select_time')}</Text>
              <TouchableOpacity
                onPress={closeTimePicker}
                style={styles.closeIconClick}>
                <CloseIcon width={17} height={17} />
              </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
              <WheelPicker
                items={hours.map(hour => hour.toString().padStart(2, '0'))}
                onIndexChange={index =>
                  setLocalValue(new Date(localValue.setHours(index)))
                }
                itemHeight={40}
                initialIndex={defaultHour}
              />
              <Text style={styles.separator}>:</Text>
              <WheelPicker
                items={minutes.map(minute =>
                  minute.toString().padStart(2, '0'),
                )}
                onIndexChange={index =>
                  setLocalValue(new Date(localValue.setMinutes(index)))
                }
                itemHeight={40}
                initialIndex={defaultMinute}
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
    marginBottom: 35,
  },
  title: {
    fontSize: 18,
    color: theme.colors.textDark,
    fontFamily: theme.customfonts.bold,
  },
  closeIconClick: {
    padding: 5,
    marginRight: -5,
  },
  pickerContainer: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  separator: {
    fontSize: 30,
    marginHorizontal: 10,
  },
  confirmButton: {
    marginTop: 12,
    width: '90%',
    paddingVertical: 20,
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
  errorText: {
    color: theme.colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
  asterisk: {
    color: theme.colors.danger,
  },
});

export default FormikTimePicker;
