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
import {GetExploreList} from '../../api/DataController';

const STORAGE_KEY = 'RECENT_SEARCHES';

const SearchTabScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [exploreData, setExploreData] = useState([]);
  const [allExploreData, setAllExploreData] = useState([]);
  const [isLoadingExplore, setIsLoadingExplore] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadExploreData();
    loadRecentSearches();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setExploreData(allExploreData);
    }
  }, [searchText]);

  const loadExploreData = async () => {
    try {
      setIsLoadingExplore(true);
      setError('');
      const response = await GetExploreList();
      const items = response.data.map(item => ({
        id: item.id,
        name: item.name.trim(),
        image: item.imagePath.trim(),
      }));
      setAllExploreData(items);
      setExploreData(items);
    } catch (err) {
      console.error('Error loading explore data:', err);
      setError('Failed to load explore data. Please try again later.');
    } finally {
      setIsLoadingExplore(false);
    }
  };

  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch (err) {
      console.error('Error loading recent searches:', err);
    }
  };

  const saveRecentSearches = async newSearches => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSearches));
    } catch (err) {
      console.error('Error saving recent searches:', err);
    }
  };

  const handleSearchSubmit = async () => {
    const trimmed = searchText.trim();
    if (!trimmed) {
      setExploreData(allExploreData);
      return;
    }

    const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 5);
    setRecentSearches(updated);
    await saveRecentSearches(updated);

    const filtered = allExploreData.filter(item =>
      item.name.toLowerCase().replace(/\s+/g, '').includes(trimmed.toLowerCase().replace(/\s+/g, '')),
    );
    setExploreData(filtered);
  };

  const handleRemoveSearch = async term => {
    const updated = recentSearches.filter(item => item !== term);
    setRecentSearches(updated);
    await saveRecentSearches(updated);
  };

  const clearAllRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setRecentSearches([]);
    } catch (err) {
      console.error('Error clearing recent searches:', err);
    }
  };

  const renderExploreItem = ({item}) => (
    <TouchableOpacity
      style={styles.exploreCard}
      onPress={() =>
        navigation.navigate('AppStack', {
          screen: 'searchDetailScreen',
          params: {cityId: item.id, cityName: item.name},
        })
      }>
      <Image source={{uri: item.image}} style={styles.exploreImage} />
      <View style={styles.textOverlay}>
        <Text style={styles.exploreText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentSearches = () =>
    recentSearches.length > 0 && (
      <>
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Searched</Text>
          <TouchableOpacity onPress={clearAllRecentSearches}>
            <Text style={[styles.sectionTitle, styles.clearAll]}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentSearchContainer}>
          {recentSearches.map((item, index) => (
            <View key={index} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveSearch(item)} style={styles.chipClose}>
                <Icon name="x" size={16} color="#888" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </>
    );

  const renderContent = () => {
    if (isLoadingExplore)
      return <ActivityIndicator size="large" color="#007bff" style={{marginTop: 20}} />;
    if (error) return <Text style={styles.errorText}>{error}</Text>;
    if (exploreData.length === 0) return <Text style={styles.emptyText}>No results found.</Text>;

    return (
      <FlatList
        data={exploreData}
        renderItem={renderExploreItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={exploreData.length > 1 ? styles.exploreGrid : null}
        contentContainerStyle={{paddingBottom: 30}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FilterSearchComponent
        searchText={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearchSubmit}
        onPressBack={() => navigation.goBack()}
      />
      <View style={{flex: 1, padding: 20}}>
        {renderRecentSearches()}
        <Text style={styles.sectionTitle}>Explore</Text>
        {renderContent()}
      </View>
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
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});

export default SearchTabScreen;
