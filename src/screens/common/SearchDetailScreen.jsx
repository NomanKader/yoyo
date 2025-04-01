import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import backIcon from '../../assets/icons/back.png';
import filterIcon from '../../assets/icons/filter.png';
import {
  AddToFavourite,
  GetPropertyListByCityId,
} from '../../api/DataController';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchDetailScreen = ({navigation, route}) => {
  const {cityId} = route.params;
  console.log('CityId', cityId);
  const [activeFilter, setActiveFilter] = useState('Sort');
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = async (propertyId) => {
    const customerId = await AsyncStorage.getItem('userId');
  
    const postBody = {
      customerId: 1, // Make sure it's a number
      propertyId: propertyId,
    };
  
    const isCurrentlyFavorite = favorites[propertyId] === true;
    const action = isCurrentlyFavorite ? 'remove' : 'add';
  
    console.log('Post Body:', postBody, 'Action:', action);
  
    try {
      const response = await AddToFavourite(action, postBody);
      console.log('Response:', action);
  
      if (!response.status) {
        Alert.alert('Error', response.message);
      } else {
        console.log(`Property ${action}ed to favorites`);
        setFavorites((prev) => ({
          ...prev,
          [propertyId]: !isCurrentlyFavorite,
        }));
      }
    } catch (error) {
      console.error(`Failed to ${action} favorite:`, error);
      Alert.alert('Error', `Failed to ${action} favorite`);
    }
  };
  
  useEffect(() => {
    const fetchPropertiesListByCityId = async () => {
      try {
        setIsLoading(true);
        const response = await GetPropertyListByCityId(cityId);
        if (response.status) {
          const propertyList = response.data.map(item => ({
            id: item.id,
            name: item.name,
            location: item.location,
            pricePerMonth: `$${item.pricePerMonth} / month`,
            imagePath: {
              uri: item.imagePath.trim(),
            },
            bedroom: item.bedroom,
            bathroom: item.bathroom,
            propertyType: item.propertyType,
          }));
          setProperties(propertyList);
        } else {
          if (response.status === false) {
            Alert.alert('Information', 'This city has no properties yet!', [
              {
                text: 'Ok',
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]);
          } else {
            console.log('Error fetching properties:', response.message);
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertiesListByCityId();
  }, []);

  const renderPropertyItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('AppStack', {
          screen: 'propertiesDetailsScreen',
        })
      }>
      <View style={styles.imageWrapper}>
        <Image source={item.imagePath} style={styles.propertyImage} />

        <View style={styles.topIcons}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => toggleFavorite(item.id.toString())}>
            <FontAwesome
              name={favorites[item.id] ? 'heart' : 'heart-o'}
              size={16}
              color={favorites[item.id] ? '#e63946' : '#999'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconCircle}>
            <Icon name="share-2" size={16} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.price}>{item.pricePerMonth}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>{item.propertyType}</Text>
          <Text style={styles.detailText}>{item.bedroom} Bed</Text>
          <Text style={styles.detailText}>{item.bathroom} Bath</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}
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
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        renderItem={renderPropertyItem}
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    width: '48%',
    overflow: 'hidden',
    elevation: 1,
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
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
});
