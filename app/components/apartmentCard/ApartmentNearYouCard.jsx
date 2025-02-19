import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import starIcon from '../../assets/icons/star.png';
import plusIcon from "../../assets/icons/plus.png";
import theme from '../../style/colors';

const ApartmentNearYouCard = ({ item,width = 300 }) => {
  return (
    <View
      style={[styles.card,{width:width}]}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.overlay} />
      <View style={styles.overlayText}>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <Text style={styles.cardAddress}>{item.address}</Text>
        <Text style={styles.cardDistance}>{item.distance}</Text>
      </View>
      <View style={styles.starIcon}>
        <Image
          source={starIcon}
          style={{ width: 24, height: 24 }}
          tintColor={theme.colors.starColor}
        />
        <Text style={styles.rating}>4</Text>
        <Image
          source={plusIcon}
          style={{ width: 40, height: 40, marginLeft: '70%' }}
          tintColor={theme.colors.textLight}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf:'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    elevation: 3,
    backgroundColor: '#fff',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  overlayText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginStart: 15,
  },
  cardAddress: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
  },
  cardDistance: {
    fontWeight: '500',
    fontSize: 14,
    color: '#fff',
  },
  starIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    color: theme.colors.starColor,
  },
});

export default ApartmentNearYouCard;