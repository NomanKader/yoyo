import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {GetPropertyListByCityId} from '../../api/DataController';
import {AddOrRemoveController} from '../../api/Favourite/FavouriteController';

import PropertiesCardComponent from '../../components/Property/PropertiesCardComponent';
import FilterSearchComponent from '../../components/Filter/FilterSearchComponent';

const SearchDetailScreen = ({navigation, route}) => {
  const {cityId, cityName} = route?.params || {};

  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Sort');
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPropertiesListByCityId();
  }, []);

  const fetchPropertiesListByCityId = async () => {
    try {
      setIsLoading(true);
      const response = await GetPropertyListByCityId(cityId);

      if (response.status) {
        const propertyList = response.data.map(item => ({
          id: item.id,
          name: item.name,
          location: item.location,
          pricePerMonth: `$${Number(
            item.pricePerMonth,
          ).toLocaleString()} / month`,
          imagePath: {uri: item.imagePath.trim()},
          bedroom: item.bedroom,
          bathroom: item.bathroom,
          propertyType: item.propertyType,
        }));
        setProperties(propertyList);
        setAllProperties(propertyList); // store original list
      } else {
        Alert.alert('Information', 'This city has no properties yet!', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Something went wrong while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchTextChange = text => {
    setSearchText(text);
    const filtered = allProperties.filter(item =>
      item.name.toLowerCase().includes(text.trim().toLowerCase()),
    );
    setProperties(filtered);
  };

  const toggleFavorite = async propertyId => {
    const postBody = {
      customerId: 1,
      propertyId,
    };

    const isFavorite = favorites[propertyId];
    const action = isFavorite ? 'remove' : 'add';

    try {
      const response = await AddOrRemoveController(action, postBody);

      if (!response.status) {
        Alert.alert('Error', response.message);
      } else {
        setFavorites(prev => ({
          ...prev,
          [propertyId]: !isFavorite,
        }));
      }
    } catch (error) {
      console.error(`Failed to ${action} favorite:`, error);
      Alert.alert('Error', `Failed to ${action} favorite`);
    }
  };

  const renderPropertyItem = ({item}) => (
    <PropertiesCardComponent
      item={item}
      isFavorite={favorites[item.id]}
      onToggleFavorite={toggleFavorite}
      icon={'share-2'}
      onPress={() =>
        navigation.navigate('AppStack', {
          screen: 'propertiesDetailsScreen',
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}

      {/* Search Bar with live filter */}
      <FilterSearchComponent
        searchText={searchText}
        onChangeText={handleSearchTextChange}
        onPressBack={() => navigation.goBack()}
        placeholder={cityName || 'Search'}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Property rent on {cityName || 'Unknown'}
        </Text>
        <TouchableOpacity style={styles.mapButton}>
          <Icon name="map" size={16} color="#333" style={styles.mapIcon} />
          <Text style={styles.mapText}>Maps</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.propertyCount}>
        {properties.length} Properties found
      </Text>

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

      <FlatList
        data={properties}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={renderPropertyItem}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  filterButtonActive: {
    borderColor: '#007bff',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  filterTextActive: {
    color: '#007bff',
  },
  row: {
    justifyContent: 'space-between',
  },
});
