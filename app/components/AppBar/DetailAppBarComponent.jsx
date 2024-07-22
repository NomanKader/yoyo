import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonStyles } from '../../style/CommonStyles';
import backIcon from '../../assets/icons/backIcon.png';
import moreIcon from '../../assets/icons/moreIcon.png';

const DetailAppBarComponent = ({ title, onMorePress }) => {
  return (
    <View style={styles.headerIcons}>
      <Image
        source={backIcon} // Use appBarIcon for back icon
        style={CommonStyles.appBarIcon}   // Style for both icons
      />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onMorePress}>
        <Image
          source={moreIcon} // Use appBarIcon for more icon
          style={CommonStyles.appBarIcon}   // Style for both icons
        />
      </TouchableOpacity>
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
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default DetailAppBarComponent;
