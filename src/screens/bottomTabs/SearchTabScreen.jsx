import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import backIcon from '../../assets/icons/back.png';
import filterIcon from '../../assets/icons/filter.png';
import theme from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';
import FilterModalComponent from '../../components/filterModal/FilterModalComponent';

const SearchTabScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Bangkok',
    'Ao Noi',
    'Ari',
    'Thong Lo',
    'BTS Ekkamai',
  ]);

  const exploreData = [
    {
      id: '1',
      name: 'Silom',
      image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
    },
    {
      id: '2',
      name: 'Asok',
      image: 'https://images.pexels.com/photos/358528/pexels-photo-358528.jpeg',
    },
    {
      id: '3',
      name: 'Silom',
      image: 'https://images.pexels.com/photos/258109/pexels-photo-258109.jpeg',
    },
    {
      id: '4',
      name: 'Ekkamai',
      image: 'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg',
    },
    {
      id: '5',
      name: 'Sathorn',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
    },
    {
      id: '6',
      name: 'Phrom Phong',
      image: 'https://images.pexels.com/photos/358588/pexels-photo-358588.jpeg',
    },
  ];

  const removeSearch = item => {
    setRecentSearches(prevSearches => {
      const updatedSearches = prevSearches.filter(search => search !== item);
      return [...updatedSearches];
    });
  };

  const handleSearchSubmit = () => {
    if (searchText.trim() !== '') {
      setRecentSearches(prevSearches => {
        const updatedSearches = [
          searchText,
          ...prevSearches.filter(item => item !== searchText),
        ];
        return updatedSearches.slice(0, 5);
      });

      setSearchText('');
    }
  };

  const renderExploreItem = ({item}) => (
    <TouchableOpacity style={styles.exploreCard}>
      <Image source={{uri: item.image}} style={styles.exploreImage} />
      <View style={styles.textOverlay}>
        <Text style={styles.exploreText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={backIcon}
            style={{width: 35, height: 35, justifyContent: 'center'}}
          />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Icon
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />

          <TextInput
            placeholder="Search here"
            style={styles.searchInput}
            onSubmitEditing={handleSearchSubmit} // Add function to handle submission
          />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={filterIcon}
            style={{width: 40, height: 40, justifyContent: 'center'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, padding: 20}}>
        {recentSearches.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Recent Searched</Text>
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

        <Text style={styles.sectionTitle}>Explore</Text>
        <FlatList
          data={exploreData}
          renderItem={renderExploreItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.exploreGrid}
        />
      </View>
      <FilterModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalContainer: {flex: 1, padding: 20},
  modalTitle: {fontSize: 18, fontWeight: 'bold'},
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  searchInput: {flex: 1, fontSize: 16},

  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},

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
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 5,
  },

  chipText: {fontSize: 14, color: '#333'},

  chipClose: {fontSize: 16, marginLeft: 10, color: '#888'},

  exploreGrid: {justifyContent: 'space-between'},

  exploreCard: {
    flex: 1,
    marginBottom: 15,
    marginRight: 10,
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
});

export default SearchTabScreen;
