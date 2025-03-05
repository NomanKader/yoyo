import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import DefaultButtonComponent from '../Button/DefaultButtonComponent';
import ContactIcon from '../../assets/icons/contact.svg';
import theme from '../../styles/colors';
import { CommonStyles } from '../../styles/CommonStyles';

const FormikContactPicker = ({
  label,
  labelColor,
  formikProps,
  formikKey,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
}) => {
  const [contactsList, setContactsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const requestContactPermission = async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.CONTACTS,
        android: PERMISSIONS.ANDROID.READ_CONTACTS,
      });

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        openContactsPicker();
      } else {
        Alert.alert(
          'Permission Denied',
          'We need access to your contacts to proceed.',
        );
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const openContactsPicker = () => {
    Contacts.getAll()
      .then(contacts => {
        if (contacts.length > 0) {
          setContactsList(contacts);
          setModalVisible(true);
        } else {
          Alert.alert('No Contacts', 'No contacts found in your phonebook.');
        }
      })
      .catch(error => {
        console.error('Failed to load contacts:', error);
        Alert.alert('Error', 'There was an error fetching contacts.');
      });
  };

  const selectContact = contact => {
    formikProps.setFieldValue(
      formikKey,
      contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : '',
    );
    setModalVisible(false);
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => selectContact(item)}>
      <View style={styles.contactTextContainer}>
        <Text style={styles.contactText}>
          {item.givenName} {item.familyName}
        </Text>
        {item.phoneNumbers.length > 0 ? (
          <Text style={styles.contactPhone}>{item.phoneNumbers[0].number}</Text>
        ) : (
          <Text style={styles.contactPhone}>No phone number available</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const hasError =
    formikProps.touched[formikKey] && formikProps.errors[formikKey];

  return (
    <View style={[CommonStyles.inputContainer, hasError && styles.error]}>
      {label && (
        <Text style={[styles.formLabel, { color: labelColor }]}>{label}</Text>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.formInput, hasError && styles.errorInput]}
          placeholder={placeholder}
          placeholderTextColor="gray"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          value={formikProps.values[formikKey] || ''}
          onChangeText={formikProps.handleChange(formikKey)}
          onBlur={formikProps.handleBlur(formikKey)}
        />
      </View>

      <TouchableOpacity
        onPress={requestContactPermission}
        style={styles.contactPickerButton}>
        <ContactIcon width={35} height={35} />
      </TouchableOpacity>

      {hasError && (
        <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={contactsList}
              keyExtractor={item => item.recordID.toString()}
              renderItem={renderContactItem}
              style={styles.contactList}
              contentContainerStyle={styles.contactListContent}
            />
            <View style={{ alignItems: 'center' }}>
              <DefaultButtonComponent
                title="Cancel"
                backgroundColor="blue"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  errorInput: {
    borderColor: theme.colors.danger,
  },
  contactPickerButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  contactPickerButtonText: {
    color: theme.colors.white,
    fontSize: 16,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactText: {
    fontSize: 16,
  },
  contactList: {
    maxHeight: 300,
  },
  contactListContent: {
    paddingBottom: 20,
  },
  titleContainer: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 16,
    backgroundColor: theme.colors.titleBackgroundColor,
    shadowColor: theme.colors.textDark,
    shadowOffset: {
      width: 2,
      height: 0,
    },
  },
  titleText: {
    color: theme.colors.textBlack,
    fontSize: 20,
    fontFamily: theme.customfonts.regular,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  contactList: {
    width: '100%',
    flexGrow: 0,
  },
  contactItem: {
    padding: 15,
    backgroundColor: theme.colors.formBorderColor,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  contactTextContainer: {
    justifyContent: 'center',
  },
  contactText: {
    fontSize: 18,
    color: theme.colors.textBlack,
  },
  contactPhone: {
    fontSize: 16,
    color: theme.colors.textBlack,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    marginTop: '50%',
    height: '100%',
    borderRadius: 10,
    elevation: 5,
    position: 'relative',
  },
});

export default FormikContactPicker;
