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
import {commonStyle} from '../../style/commonStyle';
import {Dropdown} from 'react-native-element-dropdown';

// Dummy Property Data
const propertyTypeOptions = [
  {label: 'Condo', value: 'Condo'},
  {label: 'House', value: 'House'},
  {label: 'Apartment', value: 'Apartment'},
];

const statusOptions = [
  {label: 'Available', value: 'Available'},
  {label: 'Not Available', value: 'Not Available'},
];

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
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedBeds, setSelectedBeds] = useState('');
  const [selectedBaths, setSelectedBaths] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Condo');
  const [selectedStatus, setSelectedStatus] = useState('Available');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [keywords, setKeywords] = useState('');

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

  const resetFilters = () => {
    setKeywords('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedBeds('');
    setSelectedBaths('');
    setSelectedPropertyType('Condo'); // or '' if you want nothing selected
    setSelectedStatus('Available'); // or '' if you want nothing selected
  };

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
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}>
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

      <Modal
        isVisible={filterModalVisible}
        onBackdropPress={() => setFilterModalVisible(false)}
        backdropOpacity={0.4}
        style={{margin: 0}}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        propagateSwipe={true}>
        <View style={styles.filterModalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Properties</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Icon name="x" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <TextInput
            value={keywords}
            onChangeText={text => setKeywords(text)}
            placeholder="Keywords"
            style={styles.inputBox}
          />
          <Text style={styles.modalTitle}>Price range</Text>

          <View style={styles.row}>
            <TextInput
              value={minPrice}
              onChangeText={text => setMinPrice(text)}
              placeholder="Min"
              style={[styles.inputBox, styles.half]}
            />
            <TextInput
              value={maxPrice}
              onChangeText={text => setMaxPrice(text)}
              placeholder="Max"
              style={[styles.inputBox, styles.half]}
            />
          </View>
          <Text style={styles.label}>Beds</Text>
          <View style={styles.row}>
            {['Studio', '1+', '2+'].map(label => (
              <TouchableOpacity
                key={label}
                onPress={() => setSelectedBeds(label)}
                style={[
                  styles.optionBox,
                  selectedBeds === label && styles.selectedOptionBox,
                ]}>
                <Text
                  style={{
                    fontWeight: selectedBeds === label ? 'bold' : 'normal',
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Baths</Text>
          <View style={styles.row}>
            {['1', '1+', '2+'].map(label => (
              <TouchableOpacity
                key={label}
                onPress={() => setSelectedBaths(label)}
                style={[
                  styles.optionBox,
                  selectedBaths === label && styles.selectedOptionBox,
                ]}>
                <Text
                  style={{
                    fontWeight: selectedBaths === label ? 'bold' : 'normal',
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Property Type</Text>
          <Dropdown
            style={styles.dropdown}
            data={propertyTypeOptions}
            labelField="label"
            valueField="value"
            placeholder="Select type"
            value={selectedPropertyType}
            onChange={item => {
              setSelectedPropertyType(item.value);
            }}
          />

          <Text style={styles.label}>Status</Text>
          <Dropdown
            style={styles.dropdown}
            data={statusOptions}
            labelField="label"
            valueField="value"
            placeholder="Select status"
            value={selectedStatus}
            onChange={item => {
              setSelectedStatus(item.value);
            }}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={{color: '#000'}}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={{color: '#FFF'}}>Apply</Text>
            </TouchableOpacity>
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
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  modalOuterContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  modalInnerContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 15},
  modalOption: {paddingVertical: 10},
  modalItemText: {fontSize: 16, color: '#333'},
  filterModalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  half: {width: '48%'},
  label: {fontWeight: '600', marginBottom: 5, color: '#333'},
  optionBox: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
  },

  selectedOptionBox: {
    borderColor: '#007BFF', // or your primary color
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    width: '48%',
    alignItems: 'center',
  },
  applyButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#007BFF',
    width: '48%',
    alignItems: 'center',
  },
});
