// SearchAppBarComponent.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { CommonStyles } from '../../style/CommonStyles';
import backIcon from '../../assets/icons/backIcon.png';
import theme from '../../style/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing an icon from react-native-vector-icons

const SearchAppBarComponent = ({ navigation, searchQuery, onSearchChange }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={backIcon}
            style={CommonStyles.appBarIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
        <View style={CommonStyles.appBarIcon} />
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={theme.colors.textDark} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by room no or status"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.textLight,
    padding: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.textDark,
    fontWeight: '900',
    fontSize: 18,
    alignSelf: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});

export default SearchAppBarComponent;
