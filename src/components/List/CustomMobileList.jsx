import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import theme from '../../styles/colors';

const CustomMobileList = ({data, onPressItem}) => {
  return (
    <View style={styles.grid}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={() => onPressItem(item)}>
          {/* Check if logo is a component, otherwise assume it’s a URI */}
          {typeof item.logo === 'function' ? (
            <item.logo width={60} height={60} /> // Render SVG directly
          ) : (
            <View style={styles.logo}>{item.logo}</View>
          )}
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align items to the left
  },
  itemContainer: {
    width: '25%', // 25% width for 4 items per row
    alignItems: 'center', // Center content within each item
    justifyContent: 'center',
    marginVertical: 10, // Vertical margin for spacing between rows
  },
  logo: {
    borderRadius: 140,
    marginBottom: 5,
    // backgroundColor: theme.colors.light,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: theme.customfonts.regular,
  },
});

export default CustomMobileList;
