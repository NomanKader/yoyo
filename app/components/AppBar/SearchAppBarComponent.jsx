// SearchAppBarComponent.jsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {CommonStyles} from '../../style/CommonStyles';
import backIcon from '../../assets/icons/backIcon.png';
import theme from '../../style/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing an icon from react-native-vector-icons

const SearchAppBarComponent = ({
  navigation,
  searchQuery,
  onSearchChange,
  onSearchPress,
  changeFilterVisible,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={CommonStyles.appBarIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AppStack', {screen: 'MapScreen'});
            console.log('Pressed');
          }}>
          <Icon
            name="map-outline"
            size={20}
            color={theme.colors.textDark}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => onSearchPress(searchQuery)}>
          <Icon
            name="search"
            size={20}
            color={theme.colors.textDark}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by hotel"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        <TouchableOpacity onPress={changeFilterVisible}>
          <Icon
            name="options-outline"
            size={20}
            color={theme.colors.textDark}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
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
    backgroundColor: theme.status.backgroundColor,
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
