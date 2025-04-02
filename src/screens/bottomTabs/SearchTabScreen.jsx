import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../../styles/colors';
import FilterModalComponent from '../../components/filterModal/FilterModalComponent';
import FilterSearchComponent from '../../components/Filter/FilterSearchComponent';
import {GetExploreList, GetPropertyTypes} from '../../api/DataController';

const STORAGE_KEY = 'RECENT_SEARCHES';

const SearchTabScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [propertyTypes, setPropertyType] = useState([]);
  const [isLoadingExplore, setIsLoadingExplore] = useState(true);
  const [exploreData, setExploreData] = useState([]);
  const [allExploreData, setAllExploreData] = useState([]);

  // Initial data load
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoadingExplore(true);
        const [propertyTypeList, exploreList] = await Promise.all([
          GetPropertyTypes(),
          GetExploreList(),
        ]);

        const propertyNames = propertyTypeList.data.map(item => item.name);
        const exploreItems = exploreList.data.map(item => ({
          id: item.id,
          name: item.name.trim(),
          image: item.imagePath.trim(),
        }));

        setPropertyType(propertyNames);
        setAllExploreData(exploreItems);
        setExploreData(exploreItems);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoadingExplore(false);
      }
    };

    const loadRecentSearches = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setRecentSearches(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    };

    getData();
    loadRecentSearches();
  }, []);

  // Reset filtered data when search is cleared
  useEffect(() => {
    if (searchText.trim() === '') {
      setExploreData(allExploreData);
    }
  }, [searchText]);

  const saveRecentSearches = async newSearches => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSearches));
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  const handleSearchSubmit = async () => {
    const trimmed = searchText.trim();
    if (trimmed === '') {
      setExploreData(allExploreData);
      return;
    }

    const updatedSearches = [
      trimmed,
      ...recentSearches.filter(item => item !== trimmed),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    await saveRecentSearches(updatedSearches);

    const filtered = allExploreData.filter(item =>
      item.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(trimmed.toLowerCase().replace(/\s+/g, '')),
    );

    setExploreData(filtered);
  };

  const removeSearch = async item => {
    const updated = recentSearches.filter(search => search !== item);
    setRecentSearches(updated);
    await saveRecentSearches(updated);
  };

  const clearAllRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setRecentSearches([]);
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  };

  const renderExploreItem = ({item}) => (
    <TouchableOpacity
      style={styles.exploreCard}
      onPress={() =>
        navigation.navigate('AppStack', {
          screen: 'searchDetailScreen',
          params: {
            cityId: item.id,
            cityName: item.name,
          },
        })
      }>
      <Image source={{uri: item.image}} style={styles.exploreImage} />
      <View style={styles.textOverlay}>
        <Text style={styles.exploreText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <FilterSearchComponent
        searchText={searchText}
        onChangeText={setSearchText}
        showFilterIcon={true}
        onSubmitEditing={handleSearchSubmit}
        onPressBack={() => navigation.goBack()}
        onPressFilter={() => setModalVisible(true)}
      />

      <View style={{flex: 1, padding: 20}}>
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <>
            <View style={styles.recentHeader}>
              <Text style={styles.sectionTitle}>Recent Searched</Text>
              <TouchableOpacity onPress={clearAllRecentSearches}>
                <Text style={[styles.sectionTitle, styles.clearAll]}>
                  Clear All
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.recentSearchContainer}>
              {recentSearches.map((item, index) => (
                <View key={index} style={styles.chip}>
                  <Text style={styles.chipText}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => removeSearch(item)}
                    style={styles.chipClose}>
                    <Icon name="x" size={16} color="#888" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Explore List */}
        <Text style={styles.sectionTitle}>Explore</Text>
        {isLoadingExplore ? (
          <ActivityIndicator size="large" color="#007bff" style={{marginTop: 20}} />
        ) : exploreData.length === 0 ? (
          <Text style={styles.emptyText}>No results found.</Text>
        ) : (
          <FlatList
            data={exploreData}
            renderItem={renderExploreItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={
              exploreData.length > 1 ? styles.exploreGrid : null
            }
            contentContainerStyle={{paddingBottom: 30}}
          />
        )}
      </View>

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

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  clearAll: {fontSize: 14, color: '#007bff'},
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentSearchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 20,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.textLight,
    borderWidth: 1,
    borderColor: theme.colors.chipBorderColor,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  chipText: {fontSize: 14, color: '#333'},
  chipClose: {
    fontSize: 16,
    marginLeft: 6,
    justifyContent: 'center',
  },
  exploreGrid: {
    justifyContent: 'space-between',
  },
  exploreCard: {
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
  },
  exploreImage: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  textOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default SearchTabScreen;
