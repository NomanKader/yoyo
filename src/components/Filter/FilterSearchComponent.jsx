import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import backIcon from '../../assets/icons/back.png';
import filterIcon from '../../assets/icons/filter.png';

const FilterSearchComponent = ({
  searchText,
  onChangeText,
  onSubmitEditing,
  onPressBack,
  onPressFilter,
  showFilterIcon = false,
}) => {
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity onPress={onPressBack}>
        <Image source={backIcon} style={{width: 35, height: 35}} />
      </TouchableOpacity>

      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          placeholder="Search here"
          style={styles.searchInput}
          value={searchText}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="search"
        />
      </View>
      {showFilterIcon && (
        <TouchableOpacity onPress={onPressFilter}>
          <Image source={filterIcon} style={{width: 40, height: 40}} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
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
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
});

export default FilterSearchComponent;
