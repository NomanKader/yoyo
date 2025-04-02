import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  AddOrRemoveController,
  GetFavoriteList,
} from '../../api/Favourite/FavouriteController';
import PropertiesCardComponent from '../../components/Property/PropertiesCardComponent';

const FavouriteListScreen = ({navigation}) => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavouriteList();
  }, []);

  const fetchFavouriteList = async () => {
    try {
      setIsLoading(true);
      const response = await GetFavoriteList(1); // Always use customerId = 1

      if (response?.status) {
        const propertyList = response?.data.map(item => ({
          id: item.id,
          name: item.name,
          location: item.location,
          pricePerMonth: `$${Number(item.pricePerMonth).toLocaleString()} / month`,
          imagePath: {uri: item.imageUrl.trim()},
          bedroom: item.bedroom,
          bathroom: item.bathroom,
          propertyType: item.propertyType,
        }));

        setFavoriteList(propertyList);
      } else {
        setFavoriteList([])
      }
    } catch (error) {
      console.error('Error fetching favorite list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async propertyId => {
    const postBody = {
      customerId: 1,
      propertyId,
    };

    try {
      const response = await AddOrRemoveController('remove', postBody);
      console.log('Remove response:', response);

      if (response.status) {
        fetchFavouriteList();
      } else {
        Alert.alert('Error', response.message || 'Failed to remove favorite.');
      }
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      Alert.alert('Error', 'Failed to remove favorite.');
    }
  };

  const handlePropertyPress = () => {
    navigation.navigate('AppStack', {
      screen: 'propertiesDetailsScreen',
    });
  };

  const renderPropertyItem = ({item}) => (
    <PropertiesCardComponent
      item={item}
      isFavorite={true}
      icon="repeat"
      onToggleFavorite={() => toggleFavorite(item.id)}
      onPress={handlePropertyPress}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{width: 24}} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : favoriteList.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No favorite list exists</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPropertyItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default FavouriteListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    fontStyle: 'italic',
  },
});
