import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import theme from '../../style/colors';


const screenWidth = Dimensions.get('window').width
const width = screenWidth * 0.9
const ApartmentPostCard = ({ item }) => {
  return (
    <View style={[styles.card,{width:width}]}>
      <View style={styles.ownerContainer}>
        {item.ownerImage ? (
          <Image source={{uri: item.ownerImage}} resizeMode='contain' style={styles.ownerImage} />
        ) : (
          <View style={[styles.ownerImage, styles.placeholder]} />
        )}
        <View>
          <Text style={styles.ownerName}>{item.owner}</Text>
          <Text style={styles.ownerTitle}>Owner</Text>
        </View>
      </View>

      <Image source={{ uri: item.image }} style={styles.cardImage} />

      <View style={styles.detailsContainer}>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.price}>{item.price}/{item.type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf:"center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  ownerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  placeholder: {
    backgroundColor: '#e0e0e0',
  },
  ownerName: {
    fontSize: 20,
    color:theme.colors.textDark,
    fontWeight: '500',
    marginBottom:10,
  },
  ownerTitle: {
    fontSize: 15,
    color: theme.colors.textOwner,
  },
  cardImage: {
    width: '100%',
    height: 207,
    resizeMode:'cover'
  },
  detailsContainer: {
    padding: 10,
  },
  address: {
    fontSize: 24,
    fontWeight: '400',
    color:theme.colors.bottomUnselectedColor
  },
  price: {
    fontSize: 20,
    fontWeight:"400",
    color: theme.colors.textOwner,
  },
});

export default ApartmentPostCard;
