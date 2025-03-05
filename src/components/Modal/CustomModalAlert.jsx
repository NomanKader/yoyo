import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import theme from '../../styles/colors';
import SuccessIcon from '../../assets/icons/icon-success.png';
import WarningIcon from '../../assets/icons/icon-warning.png';

const CustomModalAlert = ({
  visible,
  onClose,
  includeIcon = true,
  upperIconStyle,
  includeLowerIcon,
  lowerIconSource,
  title,
  message,
  type = null,
  buttons = [{text: 'OK', onPress: onClose}], // Default: single "OK" button
}) => {
  // Determine the icon based on the type
  const icon =
    type === 'success' ? SuccessIcon : type === 'warning' ? WarningIcon : null;

  const titleColor =
    type === 'success'
      ? theme.colors.success
      : type === 'warning'
      ? theme.colors.danger
      : theme.colors.textDark; // Default color for 'normal'

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <BlurView
          style={styles.blurBackground}
          blurType="light" // Can also be 'dark' or 'xlight'
          blurAmount={3}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            {includeIcon && <Image source={icon} style={styles.icon} />}
            <Text
              style={[
                styles.title,
                {
                  color: titleColor,
                },
              ]}>
              {title}
            </Text>
            <Text style={styles.message}>{message}</Text>
            {includeLowerIcon && (
              <Image
                source={lowerIconSource}
                style={[styles.icon, upperIconStyle]}
              />
            )}
          </View>
          <View style={styles.modalFooter}>
            {/* Render Buttons */}
            <View
              style={[
                styles.buttonContainer,
                buttons.length === 1 && styles.singleButtonContainer, // Adjust layout for single button
              ]}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    index === 0 && buttons.length === 2 && styles.cancelButton, // Style for first button if two buttons exist
                  ]}
                  onPress={button.onPress}>
                  <Text
                    style={[
                      styles.buttonText,
                      index === 0 &&
                        buttons.length === 2 &&
                        styles.cancelButtonText,
                    ]}>
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // Fills the entire screen
  },
  modalWrapper: {
    width: '80%',
    borderWidth: 1,
    borderColor: theme.colors.light,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    // shadowColor: theme.colors.textDark,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.05,
    // shadowRadius: 8,
    // elevation: 3,
  },
  modalContent: {
    width: '100%',
    // backgroundColor: theme.colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalFooter: {
    borderTopWidth: 0.75,
    borderTopColor: theme.colors.formBorderColor,
    width: '100%',
    // backgroundColor: theme.colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  icon: {
    width: 50,
    height: 50,
    // marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.customfonts.medium,
    color: theme.colors.textDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: theme.customfonts.regular,
    color: theme.colors.textDarkGray,
    textAlign: 'center',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  singleButtonContainer: {
    justifyContent: 'center', // Center a single button
  },
  button: {
    flex: 1,
    padding: 7,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    padding: 7,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: theme.customfonts.bold,
    color: theme.colors.textDark,
  },
  cancelButtonText: {
    color: theme.customfonts.regular,
    color: theme.colors.textDarkGray,
  },
});

export default CustomModalAlert;
