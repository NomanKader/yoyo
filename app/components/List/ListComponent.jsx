import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CommonStyles } from '../../style/CommonStyles';
import RadioButtonComponent from '../Radio/RadioButtonComponent';

export default function ListComponent({ icon, header, subheader, isRadio, radioButtons, selectedId, onRadioPress }) {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={CommonStyles.header}>{header}</Text>
        <Text style={CommonStyles.subHeader}>{subheader}</Text>
      </View>
      {isRadio && (
        <RadioButtonComponent
          radioButtons={radioButtons}
          selectedId={selectedId}
          onRadioPress={onRadioPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
    marginLeft: -10,
  },
  textContainer: {
    flex: 1,
  },
});
