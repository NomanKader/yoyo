import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import {useTranslation} from 'react-i18next';
import theme from '../../styles/colors';

const FormikFileInput = ({formikProps, formikKey, resetSignal}) => {
  const [preview, setPreview] = useState(null); // For previewing image or video
  const {t, i18n} = useTranslation();
  const hasError =
    formikProps.touched[formikKey] && formikProps.errors[formikKey];

  useEffect(() => {
    // Clear preview when resetSignal changes
    setPreview(null);
  }, [resetSignal]);

  const handleFilePick = async () => {
    try {
      // write if else for dynamic later
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      formikProps.setFieldValue(formikKey, result);
      setPreview(result); // Save file for preview
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.error('File picking error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/*<Text style={styles.label}>{label}</Text>*/}
      <View style={styles.uploadBoxWrapper}>
        <TouchableOpacity
          style={[styles.uploadBox, hasError && styles.errorWrapper]}
          onPress={handleFilePick}>
          {preview ? (
            preview.type.startsWith('image/') ? (
              <Image
                source={{uri: preview.uri}}
                style={styles.previewMedia}
                resizeMode="cover"
              />
            ) : null
          ) : (
            <View style={styles.placeholder}>
              <Icon
                name="camera"
                size={35}
                color={theme.colors.textLightGray}
              />
              <Text style={styles.placeholderText}>{t('attach_photo')}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {hasError && (
        <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  uploadBoxWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  uploadBox: {
    width: 110,
    height: 100,
    borderWidth: 2,
    borderColor: theme.colors.formBorderColor,
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderText: {
    color: theme.colors.textGray,
    fontSize: 12,
    fontFamily: theme.customfonts.regular,
    marginTop: 7,
  },
  previewMedia: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  errorWrapper: {
    borderColor: theme.colors.danger,
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.danger,
    marginTop: 4,
  },
});

export default FormikFileInput;
