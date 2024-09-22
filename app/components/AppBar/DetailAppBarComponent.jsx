import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonStyles } from '../../style/CommonStyles';
import backIcon from '../../assets/icons/backIcon.png';
import moreIcon from '../../assets/icons/moreIcon.png';
import theme from '../../style/colors';

const DetailAppBarComponent = ({ title, onMorePress, navigation, hideBackIcon, icon }) => {
  // Use the provided icon or default to moreIcon if none is passed
  const displayIcon = icon || moreIcon;

  return (
    <View style={styles.headerIcons}>
      {!hideBackIcon && (
        <TouchableOpacity onPress={navigation.goBack}>
          <Image source={backIcon} style={CommonStyles.appBarIcon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {onMorePress ? (
        <TouchableOpacity onPress={onMorePress}>
          <Image source={displayIcon} style={CommonStyles.appBarIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    fontWeight: '900',
    fontSize: 18,
    color: theme.colors.textDark,
    marginTop: 10,
    textAlign: 'center',
  },
  placeholder: {
    width: 30, // To maintain spacing consistency
  },
});

export default DetailAppBarComponent;
