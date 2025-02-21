import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import ApartmentPostCard from '../../components/apartmentCard/ApartmentPostCard';
import searchIcon from '../../assets/icons/search.png';
import filterIcon from '../../assets/icons/filter.png';
import theme from '../../style/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ApartmentSearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [filteredApartments, setFilteredApartments] = useState(apartmentList);

  useEffect(() => {
    setFilteredApartments(
      apartmentList.filter(apartment =>
        apartment.address.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [searchText]);

  const apartmentList = [
    {
      id: '1',
      owner: 'Hla Hla',
      ownerImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      price: '250000 MMK',
      type: 'month',
      address: 'No.12, 34th street',
      image:
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '2',
      owner: 'Yu Yu',
      ownerImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      price: '500000 MMK',
      type: 'month',
      address: 'No.11, 28th street',
      image:
        'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '3',
      owner: 'Aye Aye',
      ownerImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      price: '300000 MMK',
      type: 'year',
      address: 'No.40, 30th street',
      image:
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: theme.colors.textDark,
          }}>
          Search
        </Text>
        <TouchableOpacity onPress={() => Alert.alert('Hel')}>
          <Image
            source={filterIcon}
            style={[styles.searchIcon]}
            tintColor={theme.colors.bottomUnselectedColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Image
          source={searchIcon}
          style={styles.searchIcon}
          tintColor={theme.colors.textDark}
        />
      </View>

      <FlatList
        data={filteredApartments}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={item.id}
            onPress={() => Alert.alert(item.address)}>
            <ApartmentPostCard item={item} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'gray',
  },
});
