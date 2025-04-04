import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../styles/colors';

const FilterModalComponent = ({modalVisible, setModalVisible, navigation,propertyTypes}) => {
  const initialState = {
    selectedSort: 'Recommendations',
    selectedPropertyType: 'Apartments',
    minPrice: '',
    maxPrice: '',
    bedroom: null,
    bathroom: null,
  };

  const [filters, setFilters] = useState(initialState);

  const resetFilters = () => {
    setFilters(initialState);
  };

  const sortOptions = [
    'Recommendations',
    'Newest',
    'Lowest Price',
    'Highest Price',
  ];
  // const propertyTypes = [
  //   'Apartments',
  //   'Shop-houses',
  //   'Condominiums',
  //   'Houses',
  //   'Warehouses',
  //   'Villas',
  //   'Land',
  // ];
  const numbers = [1, 2, 3, 4, '5+'];

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={false}>
      <View style={styles.filterContainer}>
        <Text style={styles.modalTitle}>Filter</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.chipClose}>
          <Icon name="x" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Sort By */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Sort By</Text>
        <View style={styles.optionsContainer}>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                filters.selectedSort === option && styles.selectedButton,
              ]}
              onPress={() => setFilters({...filters, selectedSort: option})}>
              <Text
                style={
                  filters.selectedSort === option
                    ? styles.selectedText
                    : styles.optionText
                }>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price */}
        <Text style={styles.sectionTitle}>Price</Text>
        <View style={styles.priceContainer}>
          <TextInput
            style={styles.priceInput}
            placeholder="Min"
            keyboardType="numeric"
            value={filters.minPrice}
            onChangeText={value => setFilters({...filters, minPrice: value})}
          />
          <TextInput
            style={styles.priceInput}
            placeholder="Max"
            keyboardType="numeric"
            value={filters.maxPrice}
            onChangeText={value => setFilters({...filters, maxPrice: value})}
          />
        </View>

        {/* Property Type */}
        <Text style={styles.sectionTitle}>Property Type</Text>
        <View style={styles.optionsContainer}>
          {propertyTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionButton,
                filters.selectedPropertyType === type && styles.selectedButton,
              ]}
              onPress={() =>
                setFilters({...filters, selectedPropertyType: type})
              }>
              <Text
                style={
                  filters.selectedPropertyType === type
                    ? styles.selectedText
                    : styles.optionText
                }>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bedroom */}
        <Text style={styles.sectionTitle}>Bedroom</Text>
        <View style={styles.optionsContainer}>
          {numbers.map(num => (
            <TouchableOpacity
              key={num}
              style={[
                styles.optionButton,
                filters.bedroom === num && styles.selectedButton,
              ]}
              onPress={() => setFilters({...filters, bedroom: num})}>
              <Text
                style={
                  filters.bedroom === num
                    ? styles.selectedText
                    : styles.optionText
                }>
                {num}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bathroom */}
        <Text style={styles.sectionTitle}>Bathroom</Text>
        <View style={styles.optionsContainer}>
          {numbers.map(num => (
            <TouchableOpacity
              key={num}
              style={[
                styles.optionButton,
                filters.bathroom === num && styles.selectedButton,
              ]}
              onPress={() => setFilters({...filters, bathroom: num})}>
              <Text
                style={
                  filters.bathroom === num
                    ? styles.selectedText
                    : styles.optionText
                }>
                {num}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.buttonText}>Reset Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              console.log('Filters applied:', filters)
              setModalVisible(false);
            }}>
            <Text style={styles.buttonText}>View Properties</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#F1F1F1',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  chipClose: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  optionButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: '#0052cc',
  },
  optionText: {
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#0052cc',
    padding: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FilterModalComponent;
