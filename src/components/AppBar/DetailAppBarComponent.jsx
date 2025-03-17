import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import backIcon from '../../assets/icons/backIcon.png';
import theme from '../../styles/colors';

const DetailAppBarComponent = ({title, navigation, hideBackIcon}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      {!hideBackIcon && (
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Placeholder to keep title centered */}
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  backButton: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  title: {
    flex: 1,
    fontWeight: '900',
    fontSize: 18,
    color: theme.colors.textDark,
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // To maintain spacing consistency
  },
});

export default DetailAppBarComponent;
