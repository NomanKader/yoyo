import React, { useState } from 'react';
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

const FilterModalComponent = ({ modalVisible, setModalVisible }) => {
  const [selectedSort, setSelectedSort] = useState('Recommendations');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Apartments');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedroom, setBedroom] = useState(null);
  const [bathroom, setBathroom] = useState(null);

  const sortOptions = ['Recommendations', 'Newest', 'Lowest Price', 'Highest Price'];
  const propertyTypes = ['Apartments', 'Shop-houses', 'Condominiums', 'Houses', 'Warehouses', 'Villas', 'Land'];
  const numbers = [1, 2, 3, 4, '5+'];

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.filterContainer}>
          <Text style={styles.modalTitle}>Filter</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.chipClose}>
            <Icon name="x" size={24} color="#888" />
          </TouchableOpacity>
        </View>
        
        {/* Sort By */}
        <Text style={styles.sectionTitle}>Sort By</Text>
        <View style={styles.optionsContainer}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, selectedSort === option && styles.selectedButton]}
              onPress={() => setSelectedSort(option)}
            >
              <Text style={selectedSort === option ? styles.selectedText : styles.optionText}>{option}</Text>
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
            value={minPrice}
            onChangeText={setMinPrice}
          />
          <TextInput
            style={styles.priceInput}
            placeholder="Max"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={setMaxPrice}
          />
        </View>

        {/* Property Type */}
        <Text style={styles.sectionTitle}>Property Type</Text>
        <View style={styles.optionsContainer}>
          {propertyTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.optionButton, selectedPropertyType === type && styles.selectedButton]}
              onPress={() => setSelectedPropertyType(type)}
            >
              <Text style={selectedPropertyType === type ? styles.selectedText : styles.optionText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bedroom */}
        <Text style={styles.sectionTitle}>Bedroom</Text>
        <View style={styles.optionsContainer}>
          {numbers.map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.optionButton, bedroom === num && styles.selectedButton]}
              onPress={() => setBedroom(num)}
            >
              <Text style={bedroom === num ? styles.selectedText : styles.optionText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bathroom */}
        <Text style={styles.sectionTitle}>Bathroom</Text>
        <View style={styles.optionsContainer}>
          {numbers.map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.optionButton, bathroom === num && styles.selectedButton]}
              onPress={() => setBathroom(num)}
            >
              <Text style={bathroom === num ? styles.selectedText : styles.optionText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={() => {}}>
            <Text style={styles.buttonText}>Reset Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={() => setModalVisible(false)}>
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
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  chipClose: {
    padding: 5,
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
