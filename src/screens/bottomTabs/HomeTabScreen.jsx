import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {GetExploreList, GetRecentProperties} from '../../api/DataController';
import {toggleFavorite} from '../../components/utils/FavouriteUtils';
import PropertiesCardComponent from '../../components/Property/PropertiesCardComponent';

export default function HomeTabScreen({navigation}) {
  const [categoriesList, setCategoriesList] = useState([]);
  const [recentlyList, setRecentlyList] = useState([]);
  const [favorites, setFavorites] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [categoryRes, recentRes] = await Promise.all([
        GetExploreList(),
        GetRecentProperties(),
      ]);

      const categories = categoryRes.data.map(item => ({
        id: item.id,
        name: item.name,
        image: item.imagePath.trim(),
      }));

      const recently = recentRes.data.map(item => ({
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

      setCategoriesList(categories);
      setRecentlyList(recently);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() =>
        navigation.navigate('AppStack', {
          screen: 'searchDetailScreen',
          params: {
            cityId: item.id,
            cityName: item.name,
          },
        })
      }>
      <Image source={{uri: item.image}} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
      <Text style={styles.viewAll}>View All</Text>
    </TouchableOpacity>
  );

  const renderPropertyItem = ({item}) => (
    <PropertiesCardComponent
      item={item}
      isFavorite={favorites[item.id]}
      onToggleFavorite={() => toggleFavorite(item.id, favorites, setFavorites)}
      layout="horizontal"
      onPress={() =>
        navigation.navigate('AppStack', {
          screen: 'propertiesDetailsScreen',
          params: {
            propertyId: item.id,
          },
        })
      }
    />
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <ImageBackground
          source={require('../../assets/images/backgroundImage.png')}
          style={styles.headerBackground}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={require('../../assets/images/profileImage.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>
            Your Property Hub for All Needs
          </Text>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Icon
              name="search"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search here"
              style={styles.searchInput}
              onTouchStart={() =>
                navigation.navigate('TabStack', {screen: 'Search'})
              }
            />
          </View>
        </ImageBackground>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007bff" />
          </View>
        ) : (
          <>
            {/* Categories Section */}
            <Text style={styles.sectionTitle}>Categories</Text>
            <FlatList
              data={categoriesList}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 16}}
              keyExtractor={item => item.id.toString()}
              renderItem={renderCategoryItem}
            />

            {/* Recently Added Section */}
            <Text style={styles.sectionTitle}>Recently Added</Text>
            <FlatList
              data={recentlyList}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 16, marginBottom: 10}}
              keyExtractor={item => item.id.toString()}
              renderItem={renderPropertyItem}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },

  headerBackground: {
    width: '100%',
    height: 300,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  menuButton: {
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 16,
    marginTop: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  categoryCard: {
    width: 120,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  categoryImage: {
    width: '100%',
    height: 80,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  viewAll: {
    fontSize: 12,
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  propertyCard: {
    width: 160,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 20,
  },
  propertyImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  propertyIcons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
  },
  iconCircle: {
    backgroundColor: '#FFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginLeft: 5,
  },
  propertyName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  propertyLocation: {
    fontSize: 12,
    color: '#777',
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});
