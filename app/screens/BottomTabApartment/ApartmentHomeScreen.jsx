import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import theme from '../../style/colors';
import reverIcon from '../../assets/icons/reverse.png';
import searchIcon from '../../assets/icons/search.png';
import starIcon from '../../assets/icons/star.png';
import plusIcon from '../../assets/icons/plus.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ApartmentHomeScreen() {
  const [searchText, setSearchText] = useState('');
  // Sample Data
  const nearYou = [
    {
      id: '1',
      price: '300000 MMK',
      address: 'No.12, 34th street',
      distance: '3kms away',
      image:
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '2',
      price: '280000 MMK',
      address: 'No.9, 22nd street',
      distance: '2kms away',
      image:
        'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '3',
      price: '300000 MMK',
      address: 'No.12, 34th street',
      distance: '3kms away',
      image:
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const newListings = [
    {
      id: '1',
      address: 'No.14, 27th street',
      price: '230000 MMK/month',
      image:
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '2',
      address: 'No.10, 31st street',
      price: '300000 MMK/month',
      image:
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: '3',
      address: 'No.8, 19th street',
      price: '250000 MMK/month',
      image:
        'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '4',
      address: 'No.6, 20th street',
      price: '270000 MMK/month',
      image:
        'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '5',
      address: 'No.6, 20th street',
      price: '270000 MMK/month',
      image:
        'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '6',
      address: 'No.6, 20th street',
      price: '270000 MMK/month',
      image:
        'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  // Split listings into pairs
  const chunkListings = [];
  for (let i = 0; i < newListings.length; i += 2) {
    chunkListings.push(newListings.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {/* Location & Search */}
      <View style={styles.header}>
        <View>
          <Text style={styles.locationLabel}>Your Location</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.location}>Mahabandular Rt, Panbedan</Text>
            <Image
              source={reverIcon}
              style={{width: 20, height: 20}}
              tintColor="black"
            />
          </View>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchText}
          onChangeText={text => setSearchText(text)}
          style={{width: '80%', fontSize: 16, marginStart: 10}}
          placeholder="Search"
          placeholderTextColor={theme.colors.bottomUnselectedColor}
        />
        <TouchableOpacity onPress={() => Alert.alert("Hello") }>
          <Image
            source={searchIcon}
            style={{width: 24, height: 24, marginRight: 30}}
            tintColor="black"
          />
        </TouchableOpacity>
      </View>
      {/* Near You Section */}
      <Text style={styles.sectionTitle}>Near you</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {nearYou.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={{uri: item.image}} style={styles.cardImage} />
            <View style={styles.overlay} />
            <View style={styles.overlayText}>
              <Text style={styles.cardPrice}>{item.price}</Text>
              <Text style={styles.cardAddress}>{item.address}</Text>
              <Text style={styles.cardDistance}>{item.distance}</Text>
            </View>
            <View style={styles.starIcon}>
              <Image
                source={starIcon}
                style={{width: 24, height: 24}}
                tintColor={theme.colors.starColor}
              />
              <Text style={styles.rating}>4</Text>
              <Image
                source={plusIcon}
                style={{width: 40, height: 40, marginLeft: '70%'}}
                tintColor={theme.colors.textLight}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* New Listings Section */}
      <Text style={styles.sectionTitle}>New Listings</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={chunkListings}
        removeClippedSubviews={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.pairContainer}>
            {item.map(subItem => (
              <View key={subItem.id} style={styles.listingItem}>
                <Image
                  source={{uri: `${subItem.image}?t=${subItem.id}`}} // Unique URL per item
                  style={styles.listingImage}
                  resizeMode="cover"
                />

                <View>
                  <Text style={styles.listingAddress}>{subItem.address}</Text>
                  <Text style={styles.listingPrice}>{subItem.price}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: theme.colors.bottomUnselectedColor,
  },
  location: {
    marginRight: '30%',
    fontSize: 15,
    color: theme.colors.bottomUnselectedColor,
    fontWeight: '600',
  },
  pairContainer: {
    width: 300,
    marginRight: 15, // Added spacing between horizontal items
  },
  searchContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    elevation: 2,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}], // Center the icon
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: theme.colors.bottomUnselectedColor,
    marginVertical: 10,
  },
  card: {
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    elevation: 3,
    backgroundColor: '#fff',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 250, // Adjust height to prevent stretching
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
  listingItem: {
    width: '100%',
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
