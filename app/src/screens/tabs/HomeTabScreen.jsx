import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';

// Components
import PropertyCardComponent from '../../components/Card/PropertyCardComponent';
import CardSkeletonComponent from '../../components/Skeleton/CardSkeletonComponent';
import { commonStyle } from '../../style/commonStyle';

// Dummy Property Data
const properties = [
  {
    id: '1',
    name: 'Skyview Residence 40',
    location: 'Phrom Phong, Bangkok',
    price: 1200,
    beds: '2 Bed',
    baths: '1 Bath',
    type: 'Condo',
    status: 'Available',
    createdAt: '2024-05-01',
    image: {uri: 'https://picsum.photos/200/300?random=1'},
  },
  {
    id: '2',
    name: 'Emerald Bay Towers',
    location: 'Phrom Phong, Bangkok',
    price: 1100,
    beds: '2 Bed',
    baths: '1 Bath',
    type: 'Condo',
    status: 'Available',
    createdAt: '2024-04-25',
    image: {uri: 'https://picsum.photos/200/300?random=2'},
  },
  {
    id: '3',
    name: 'Riverwalk Lofts',
    location: 'Phrom Phong, Bangkok',
    price: 1400,
    beds: '2 Bed',
    baths: '1 Bath',
    type: 'Condo',
    status: 'Not Available',
    createdAt: '2024-03-10',
    image: {uri: 'https://picsum.photos/200/300?random=3'},
  },
];

export default function HomeTabScreen() {
  const {t} = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('Recommendation');
  const [sortModalVisible, setSortModalVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Filtering
  let filteredProperties = properties.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sorting
  if (sortOption === 'Price(low to high)') {
    filteredProperties = filteredProperties.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'Price(high to low)') {
    filteredProperties = filteredProperties.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'Newest') {
    filteredProperties = filteredProperties.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }
  // Recommendation => no sorting (default)

  const renderPropertyItem = ({item}) => (
    <PropertyCardComponent item={{...item, price: `$${item.price} / month`}} />
  );

  return (
    <View style={commonStyle.container}>
      {/* Search and Filter */}
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#A0A0A0" />
          <TextInput
            placeholder="Search using keywords"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.filterSortRow}>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="sliders" size={20} color="#000" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSortModalVisible(true)}>
            <Text style={styles.sortLabel}>
              Sort: <Text style={styles.sortValue}>{sortOption}</Text>
            </Text>
            <Icon name="chevron-down" size={16} color="#dc3545" />
          </TouchableOpacity>
        </View>

        {/* Property List */}
        {loading ? (
          Array.from({length: 3}).map((_, index) => (
            <CardSkeletonComponent key={index} />
          ))
        ) : (
          <FlatList
            data={filteredProperties}
            renderItem={renderPropertyItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
          />
        )}
      </View>

      {/* Floating Button */}
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Sort Modal */}
      <Modal
        isVisible={sortModalVisible}
        onBackdropPress={() => setSortModalVisible(false)}
        backdropOpacity={0.4}
        style={{margin: 0}} // Fullscreen overlay ✅
        animationIn="slideInUp"
        animationOut="slideOutDown"
        propagateSwipe={true} // ✅
      >
        <View style={styles.modalOuterContainer}>
          <View style={styles.modalInnerContent}>
            <Text style={styles.modalTitle}>Sort By</Text>

            {[
              'Recommendation',
              'Price(low to high)',
              'Price(high to low)',
              'Newest',
            ].map(option => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => {
                  setSortOption(option);
                  setSortModalVisible(false);
                }}>
                <Text
                  style={[
                    styles.modalItemText,
                    sortOption === option && {
                      color: '#0047AB',
                      fontWeight: 'bold',
                    },
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 45,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  filterSortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  filterButtonText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: '#000',
  },
  sortValue: {
    color: '#dc3545',
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#0047AB',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  modalContainer: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalOuterContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  modalInnerContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
