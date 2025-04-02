import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../styles/colors';

const PropertiesCardComponent = ({
  item,
  onPress,
  onToggleFavorite,
  isFavorite,
  icon,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Image Section */}
      <View style={styles.imageWrapper}>
        <Image source={item.imagePath} style={styles.propertyImage} />

        <View style={styles.topIcons}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => onToggleFavorite(item.id.toString())}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={16}
              color={isFavorite ? '#e63946' : '#999'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconCircle}>
            <Icon name={icon} size={16} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.price}>{item.pricePerMonth}</Text>

        <View style={styles.divider} />

        <View style={styles.details}>
          {item.propertyType && (
            <View style={styles.detailItem}>
              <Icon name="home" size={12} color="#555" />
              <Text style={styles.detailText}>{item.propertyType}</Text>
            </View>
          )}
          <View style={styles.detailItem}>
            <FontAwesome name="bed" size={12} color="#555" />
            <Text style={styles.detailText}>{item.bedroom} Bed</Text>
          </View>
          <View style={styles.detailItem}>
            <FontAwesome name="bath" size={12} color="#555" />
            <Text style={styles.detailText}>{item.bathroom} Bath</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PropertiesCardComponent;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    width: '48%',
    borderWidth: 1,
    borderColor: '#eee', // light border
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  topIcons: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.textLightGray,
    marginVertical: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },

  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },

  detailText: {
    fontSize: 11,
    color: '#555',
    marginLeft: 4,
  },
});
