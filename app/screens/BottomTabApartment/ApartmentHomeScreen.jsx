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
import {TouchableOpacity} from 'react-native-gesture-handler';
import ApartmentNewListingCard from '../../components/apartmentCard/ApartmentNewListingCard';
import ApartmentNearYouCard from '../../components/apartmentCard/ApartmentNearYouCard';

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
        <TouchableOpacity onPress={() => Alert.alert('Hello')}>
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
          <TouchableOpacity
            activeOpacity={0.7}
            key={item.id}
            onPress={() => Alert.alert(item.address)}>
            <ApartmentNearYouCard key={item.id} item={item} />
          </TouchableOpacity>
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
              <TouchableOpacity
                activeOpacity={0.7}
                key={subItem.id}
                onPress={() => Alert.alert(subItem.address)}>
                <ApartmentNewListingCard subItem={subItem} />
              </TouchableOpacity>
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
});
