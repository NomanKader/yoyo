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

import {
  GetPropertyListByCityId,
  GetPropertyTypes,
} from '../../api/DataController';

import PropertiesCardComponent from '../../components/Property/PropertiesCardComponent';
import FilterSearchComponent from '../../components/Filter/FilterSearchComponent';
import FilterModalComponent from '../../components/filterModal/FilterModalComponent';
import {toggleFavorite} from '../../components/utils/FavouriteUtils';

const SearchDetailScreen = ({navigation, route}) => {
  const {cityId, cityName} = route?.params || {};
  const [filters, setFilters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState(0);
  const [isSortSelected, setIsSortSelected] = useState(false);
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [propertyResponse, typesResponse] = await Promise.all([
        GetPropertyListByCityId(cityId),
        GetPropertyTypes(),
      ]);
      const propertyType = typesResponse?.data?.map(item => ({
        id: item.id,
        name: item.name,
      }));

      setFilters([{id: 0, name: 'All'}, ...propertyType]);
      setPropertyTypes(typesResponse?.data?.map(item => item.name));

      if (propertyResponse?.status) {
        const mapped = propertyResponse.data.map(item => ({
          id: item.id,
          name: item.name,
          location: item.location,
          price: Number(item.pricePerMonth),
          pricePerMonth: `$${Number(
            item.pricePerMonth,
          ).toLocaleString()} / month`,
          imagePath: {uri: item.imagePath.trim()},
          bedroom: item.bedroom,
          bathroom: item.bathroom,
          propertyType: item.propertyType,
        }));
        setProperties(mapped);
        setAllProperties(mapped);
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

  const handleSearch = text => {
    setSearchText(text);
    const filtered = allProperties.filter(property =>
      property.name.toLowerCase().includes(text.trim().toLowerCase()),
    );
    setProperties(filtered);
  };

  const handleFavoriteToggle = id => {
    toggleFavorite(id, favorites, setFavorites);
  };

  const handleSlectedActiveFilter = item => {
    setActiveFilter(item.id);

    let filtered;

    if (item.id === 0) {
      // All properties
      filtered = [...allProperties];
    } else {
      // Filter by selected property type
      filtered = allProperties.filter(
        property => property.propertyType === item.name,
      );
    }

    // If sort is ON, sort the filtered list
    if (isSortSelected) {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    setProperties(filtered);
  };

  const handleSortToggle = () => {
    const toggled = !isSortSelected;
    setIsSortSelected(toggled);

    if (toggled) {
      const sorted = [...properties].sort((a, b) => a.price - b.price);
      setProperties(sorted);
    } else {
      if (activeFilter === 0) {
        setProperties(allProperties);
      } else {
        const selectedFilter = filters.find(f => f.id === activeFilter);
        const filtered = allProperties.filter(
          property => property.propertyType === selectedFilter.name,
        );
        setProperties(filtered);
      }
    }
  };

  const renderPropertyItem = ({item}) => (
    <PropertiesCardComponent
      item={item}
      isFavorite={favorites[item.id]}
      onToggleFavorite={() => handleFavoriteToggle(item.id)}
      icon="share-2"
      layout="vertical"
      onPress={() =>
        navigation.navigate('AppStack', {
          screen: 'propertiesDetailsScreen',
        })
      }
    />
  );

  const renderFilterButtons = ({item}) => {
    const isSelected = activeFilter === item.id;

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleSlectedActiveFilter(item)}
        style={[styles.filterButton, isSelected && styles.filterButtonActive]}>
        <Text
          style={[styles.filterText, isSelected && styles.filterTextActive]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}

      {/* Search Bar */}
      <FilterSearchComponent
        searchText={searchText}
        onChangeText={handleSearch}
        onPressBack={() => navigation.goBack()}
        placeholder={cityName || 'Search'}
        showFilterIcon={true}
        onPressFilter={() => setModalVisible(true)}
      />

      {/* Header Info */}
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

      {/* Filter chips and sort button */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={handleSortToggle}
          style={[
            styles.sortButton,
            isSortSelected && styles.sortButtonActive,
          ]}>
          <Text
            style={[
              styles.sortButtonText,
              isSortSelected && styles.sortButtonTextActive,
            ]}>
            Sort with Price {isSortSelected ? '↑' : ''}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={filters}
          keyExtractor={item => item.id.toString()}
          horizontal
          renderItem={renderFilterButtons}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 10, gap: 10}}
        />
      </View>

      {/* Properties List */}
      <FlatList
        data={properties}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={renderPropertyItem}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No property found</Text>
            </View>
          )
        }
      />

      {/* Filter Modal */}
      <FilterModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        propertyTypes={propertyTypes}
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
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
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  filterTextActive: {
    color: '#fff',
  },
  sortButton: {
    marginRight: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  sortButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#333',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  row: {
    justifyContent: 'space-between',
  },
});
