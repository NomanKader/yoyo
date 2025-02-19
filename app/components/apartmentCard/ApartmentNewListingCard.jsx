import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../../style/colors';


const ApartmentNewListingCard = ({ subItem,width = "100%" }) => {
  return (
    <View style={[styles.listingItem,{width:width}]}>
      <Image
        source={{ uri: `${subItem.image}?t=${subItem.id}` }}
        style={styles.listingImage}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.listingAddress}>{subItem.address}</Text>
        <Text style={styles.listingPrice}>{subItem.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listingItem: {
    alignSelf:'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  listingImage: {
    width: 80,
    height: 60,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginRight: 10,
  },
  listingAddress: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    color: theme.colors.bottomUnselectedColor,
  },
  listingPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.bottomUnselectedColor,
  },
});

export default ApartmentNewListingCard;
