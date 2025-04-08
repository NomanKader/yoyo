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
  GetLocationList,
  GetPropertiesbyFilter,
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
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState(0);
  const [isSortSelected, setIsSortSelected] = useState(false);
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);

      const [propertyResponse, typesResponse] = await Promise.all([
        GetPropertyListByCityId(cityId),
        GetPropertyTypes(),
      ]);

      const propertyTypeList = typesResponse?.data?.map(item => ({
        id: item.id,
        name: item.name,
      }));

      setFilters([{id: 0, name: 'All'}, ...propertyTypeList]);
      setPropertyTypes(propertyTypeList);

      if (propertyResponse?.status) {
        const mapped = mapProperties(propertyResponse.data);
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

  const mapProperties = data =>
    data.map(item => ({
      id: item.id,
      name: item.name,
      location: item.location,
      price: Number(item.pricePerMonth),
      pricePerMonth: `$${Number(item.pricePerMonth).toLocaleString()} / month`,
      imagePath: {uri: item.imagePath?.trim()},
      bedroom: item.bedroom,
      bathroom: item.bathroom,
      propertyType: item.propertyType,
    }));

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

  const applyFilterChip = filterItem => {
    setActiveFilter(filterItem.id);

    let filteredList =
      filterItem.id === 0
        ? [...allProperties]
        : allProperties.filter(p => p.propertyType === filterItem.name);

    if (isSortSelected) {
      filteredList = filteredList.sort((a, b) => a.price - b.price);
    }

    setProperties(filteredList);
  };

  const toggleSort = () => {
    const newSortState = !isSortSelected;
    setIsSortSelected(newSortState);

    if (newSortState) {
      const sorted = [...properties].sort((a, b) => a.price - b.price);
      setProperties(sorted);
    } else {
      applyFilterChip(filters.find(f => f.id === activeFilter));
    }
  };

  const handleFilter = async item => {
    const body = {
      city: cityName,
      minPrice: item.minPrice,
      maxPrice: item.maxPrice,
      propertyType: item.selectedPropertyTypeIds,
      bedrooms: item.bedroom,
      bathrooms: item.bathroom,
      sortBy: item.selectedSort,
    };

    try {
      const response = await GetPropertiesbyFilter(body);
      if (response?.status) {
        const mapped = mapProperties(response.data);
        setProperties(mapped);
        setAllProperties(mapped);
      } else {
        Alert.alert('Information', 'This city has no properties yet!', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      }
    } catch (error) {
      console.log('Filter fetch error', error);
    }
  };

  const handleResetFilter = () => {
    fetchInitialData();
    setActiveFilter(0);
    setIsSortSelected(false);
    setSearchText('');
  };

  const handleSearchLocation = async () => {
    try {
      const response = await GetLocationList(cityId);
      if (response?.status) {
        navigation.navigate('searchScreen', {
          locations: response.data,
        });
      } else {
        Alert.alert('Failed', 'Could not load locations');
      }
    } catch (error) {
      console.log('Location fetch error', error);
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
        onPress={() => applyFilterChip(item)}
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
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}

      <FilterSearchComponent
        searchText={searchText}
        onChangeText={handleSearch}
        onPressBack={() => navigation.goBack()}
        placeholder={cityName || 'Search'}
        showFilterIcon={true}
        onPressFilter={() => setModalVisible(true)}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Property rent on {cityName || 'Unknown'}
        </Text>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={handleSearchLocation}>
          <Icon name="map" size={16} color="#333" style={styles.mapIcon} />
          <Text style={styles.mapText}>Maps</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.propertyCount}>
        {properties.length} Properties found
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={toggleSort}
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

      <FilterModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        propertyTypes={propertyTypes}
        handleFilter={handleFilter}
        handleResetFilter={handleResetFilter}
      />
    </View>
  );
};

export default SearchDetailScreen;

// ✅ Styles (unchanged)
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
});
