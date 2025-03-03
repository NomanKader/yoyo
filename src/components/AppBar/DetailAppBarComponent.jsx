// src/components/AppBar/DetailAppBarComponent.jsx

import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {CommonStyles} from '../../styles/CommonStyles';
import BackIcon from '../../assets/icons/backIcon.svg';
import moreIcon from '../../assets/icons/moreIcon.png';
import theme from '../../styles/colors';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const DetailAppBarComponent = ({
  title,
  onMorePress,
  navigation,
  hideBackIcon,
  icon,
  titleColor = theme.colors.textDark, // default title color
  iconColor = theme.colors.textDark, // default icon color
  backgroundColor = '',
  onBackPress,
}) => {
  const displayIcon = icon || moreIcon;
  const androidInsets = initialWindowMetrics.insets;

  return (
    <View
      style={[
        styles.headerIcons,
        {marginTop: Platform.OS == 'android' ? androidInsets.top : 0},
        backgroundColor && {backgroundColor: backgroundColor},
      ]}>
      {!hideBackIcon && (
        <TouchableOpacity
          style={{marginTop: 15, zIndex: 99999}}
          onPress={onBackPress ? onBackPress : navigation.goBack}>
          <BackIcon width={28} height={28} fill={iconColor} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
      {onMorePress ? (
        <TouchableOpacity onPress={onMorePress}>
          <Image
            source={displayIcon}
            style={[CommonStyles.appBarIcon, {tintColor: iconColor}]}
          />
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
    padding: 16,
  },
  title: {
    fontFamily: theme.customfonts.medium,
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  placeholder: {
    width: 30, // To maintain spacing consistency
  },
});

export default DetailAppBarComponent;
