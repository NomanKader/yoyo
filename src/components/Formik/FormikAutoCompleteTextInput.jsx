import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import theme from '../../styles/colors';
import {CommonStyles} from '../../styles/CommonStyles';

const FormikAutoCompleteTextInput = ({
  inputContainerStyle,
  label,
  texColor = theme.colors.textDark,
  labelColor = theme.colors.textDark,
  dataList,
  placeholder,
  onValueChange,
  formikProps,
  formikKey,
  formikKeyId,
  editable = true
}) => {
  const [filteredData, setFilteredData] = useState([]);

  const hasError =
    formikProps.touched[formikKey] && formikProps.errors[formikKey];

    const handleTextChange = text => {  
      if (text) {
        const filtered = dataList.filter(item => item.name.includes(text));
        setFilteredData(filtered);
        // Update Formik value with the current text
        formikProps.setFieldValue(formikKey, text);
        formikProps.setFieldValue(formikKeyId,"")
      } else {
        setFilteredData([]);
        // Clear Formik value if input is cleared
        formikProps.setFieldValue(formikKey, '');
        formikProps.setFieldValue(formikKeyId,'')        
      }
    };

  const handleItemSelect = item => {
    formikProps.setFieldValue(formikKey,"")
    formikProps.setFieldValue(formikKey, item.name);
    formikProps.setFieldValue(formikKeyId,item.id)
    setFilteredData([]);

    if (onValueChange) onValueChange(item.name);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          CommonStyles.inputContainer,
          inputContainerStyle,
          hasError && CommonStyles.error,
        ]}>
        {label && (
          <Text style={[CommonStyles.formLabel, {color: labelColor}]}>
            {label}
          </Text>
        )}
        <TextInput
          style={[
            CommonStyles.formInput,
            hasError && styles.errorInput,
            {color: texColor},
          ]}
          placeholder={placeholder}
          placeholderTextColor={
            hasError ? theme.colors.danger : theme.colors.footerBarColor
          }
          value={formikProps.values[formikKey] || ''}
          onChangeText={handleTextChange}
          onBlur={formikProps.handleBlur(formikKey)}
          autoCapitalize="none"
          editable={editable}
        />
      </View>

      {filteredData.length > 0 && (
        <ScrollView
          style={styles.scrollView}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.scrollViewContentContainer}
          keyboardShouldPersistTaps="handled">
          {filteredData.map(item => (
            <TouchableOpacity
              key={item.id.toString()}
              style={styles.item}
              onPress={() => handleItemSelect(item)}>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    maxHeight: 200,
  },
  item: {
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
    color: theme.colors.textDark,
    fontFamily: theme.customfonts.regular,
  },
  errorInput: {
    borderColor: theme.colors.danger,
  },
});

export default FormikAutoCompleteTextInput;
