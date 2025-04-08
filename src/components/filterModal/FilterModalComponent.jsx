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

const FilterModalComponent = ({
  modalVisible,
  setModalVisible,
  propertyTypes,
  handleFilter,
  handleResetFilter,
}) => {
  const initialState = {
    selectedSort: 'Recommendations',
    selectedPropertyTypeIds: [],
    minPrice: '',
    maxPrice: '',
    bedroom: null,
    bathroom: null,
  };

  const [filters, setFilters] = useState(initialState);

  const sortOptions = [
    'Recommendations',
    'Newest',
    'Lowest Price',
    'Highest Price',
  ];
  const numbers = [1, 2, 3, 4, '5+'];

  const toggleMultiSelect = (key, id) => {
    const isSelected = filters[key].includes(id);
    const updated = isSelected
      ? filters[key].filter(item => item !== id)
      : [...filters[key], id];
    setFilters({...filters, [key]: updated});
  };

  const updateSingleValue = (key, value) => {
    setFilters({...filters, [key]: value});
  };

  const onReset = () => {
    setFilters(initialState);
    handleResetFilter();
    setModalVisible(false);
  };

  const onApply = () => {
    handleFilter(filters);
    setModalVisible(false);
  };

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

      <ScrollView contentContainerStyle={styles.container}>
        {/* Sort By */}
        <Text style={styles.sectionTitle}>Sort By</Text>
        <View style={styles.optionsContainer}>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                filters.selectedSort === option && styles.selectedButton,
              ]}
              onPress={() => updateSingleValue('selectedSort', option)}>
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
            onChangeText={value => updateSingleValue('minPrice', value)}
          />
          <TextInput
            style={styles.priceInput}
            placeholder="Max"
            keyboardType="numeric"
            value={filters.maxPrice}
            onChangeText={value => updateSingleValue('maxPrice', value)}
          />
        </View>

        {/* Property Types (multi-select) */}
        <Text style={styles.sectionTitle}>Property Types</Text>
        <View style={styles.optionsContainer}>
          {propertyTypes.map(type => {
            const isSelected = filters.selectedPropertyTypeIds.includes(
              type.id,
            );
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.optionButton,
                  isSelected && styles.selectedButton,
                ]}
                onPress={() =>
                  toggleMultiSelect('selectedPropertyTypeIds', type.id)
                }>
                <Text
                  style={isSelected ? styles.selectedText : styles.optionText}>
                  {type.name}
                </Text>
              </TouchableOpacity>
            );
          })}
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
              onPress={() => updateSingleValue('bedroom', num)}>
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
              onPress={() => updateSingleValue('bathroom', num)}>
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
          <TouchableOpacity style={styles.resetButton} onPress={onReset}>
            <Text style={styles.buttonText}>Reset Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={onApply}>
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
    marginBottom: 40,
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
