import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import backIcon from '../../assets/icons/back.png';
import filterIcon from '../../assets/icons/filter.png';

const properties = [
  {
    id: '1',
    title: 'Citi Smart Sukhumvit 18',
    location: 'Phrom Phong, Bangkok',
    price: '$1,200 / month',
    image: {
      uri: 'https://images.pexels.com/photos/358528/pexels-photo-358528.jpeg',
    },
    beds: 2,
    baths: 1,
    type: 'Condo',
  },
  {
    id: '2',
    title: 'The Waterford Rama 4',
    location: 'Phra Khanong Tai, Bangkok',
    price: '$900 / month',
    image: {
      uri: 'https://images.pexels.com/photos/258109/pexels-photo-258109.jpeg',
    },
    beds: 2,
    baths: 1,
    type: 'Condo',
  },
  {
    id: '3',
    title: 'The Deck Patong',
    location: 'Pa Tong, Phuket',
    price: '$1,500 / month',
    image: {
      uri: 'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg',
    },
    beds: 1,
    baths: 1,
    type: 'Condo',
  },
  {
    id: '4',
    title: 'Marakesh Residence',
    location: 'Nong Kae, Prachuap Khiri Khan',
    price: '$950 / month',
    image: {
      uri: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
    },
    beds: 2,
    baths: 1,
    type: 'Condo',
  },
  {
    id: '5',
    title: 'Marakesh Residence',
    location: 'Nong Kae, Prachuap Khiri Khan',
    price: '$950 / month',
    image: {
      uri: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
    },
    beds: 2,
    baths: 1,
    type: 'Condo',
  },
  {
    id: '6',
    title: 'Marakesh Residence',
    location: 'Nong Kae, Prachuap Khiri Khan',
    price: '$950 / month',
    image: {
      uri: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
    },
    beds: 2,
    baths: 1,
    type: 'Condo',
  },
];

const SearchDetailScreen = ({navigation}) => {
  const [activeFilter, setActiveFilter] = useState('Sort');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconWrapper}>
          <Image source={backIcon} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Icon
            name="search"
            size={18}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Bangkok"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity style={styles.iconWrapper}>
          <Image source={filterIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Property rent on Bangkok</Text>
        <TouchableOpacity style={styles.mapButton}>
          <Icon name="map" size={16} color="#333" style={styles.mapIcon} />
          <Text style={styles.mapText}>Maps</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.propertyCount}>1,200 Properties found</Text>

      {/* Search Bar */}

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['Sort', 'Bedrooms', 'Price', 'Property Type'].map(filter => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterButtonActive,
            ]}>
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Property List in Grid */}
      <FlatList
        data={properties}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.propertyImage} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <View style={styles.details}>
                <Text style={styles.detailText}>{item.type}</Text>
                <Text style={styles.detailText}>{item.beds} Bed</Text>
                <Text style={styles.detailText}>{item.baths} Bath</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default SearchDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  mapIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  mapText: {
    fontSize: 14,
    color: '#333',
  },
  propertyCount: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 44,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderRadius: 20, // More rounded
    borderWidth: 1, // Add border
    borderColor: '#ccc', // Default border color (inactive)
    backgroundColor: '#fff', // White background
  },
  filterButtonActive: {
    borderColor: '#007bff', // Blue border for active button
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  filterTextActive: {
    color: '#007bff', // Blue text for active button
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    width: '48%',
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 12,
    color: '#777',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  details: {
    flexDirection: 'row',
    marginTop: 4,
  },
  detailText: {
    fontSize: 10,
    color: '#555',
    marginRight: 6,
  },
});
