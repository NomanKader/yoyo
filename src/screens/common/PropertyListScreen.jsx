import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const properties = [
  { id: '1', name: 'Citi Smart Sukhumvit 18', location: 'Bangkok', price: '$1,200 / month', image: require('../../assets/images/property1.jpg') },
  { id: '2', name: 'The Waterford Rama 4', location: 'Bangkok', price: '$900 / month', image: require('../../assets/images/property2.jpg') },
  { id: '3', name: 'The Deck Patong', location: 'Phuket', price: '$1,000 / month', image: require('../../assets/images/property1.jpg') },
];

const PropertyListScreen = ({ route, navigation }) => {
  const { location } = route?.params;

  // Filter properties by location
  const filteredProperties = properties?.filter(property => property.location === location);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Properties in {location}</Text>
        <TouchableOpacity>
          <Icon name="map" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Property List */}
      <FlatList
        data={filteredProperties}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.propertyCard}>
            <Image source={item.image} style={styles.propertyImage} />
            <View style={styles.propertyDetails}>
              <Text style={styles.propertyName}>{item.name}</Text>
              <Text style={styles.propertyLocation}>{item.location}</Text>
              <Text style={styles.propertyPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="heart" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  propertyCard: { backgroundColor: '#F8F8F8', borderRadius: 10, marginBottom: 15, padding: 10, flexDirection: 'row', alignItems: 'center' },
  propertyImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  propertyDetails: { flex: 1 },
  propertyName: { fontSize: 16, fontWeight: 'bold' },
  propertyLocation: { fontSize: 14, color: '#666' },
  propertyPrice: { fontSize: 14, fontWeight: 'bold', color: '#007BFF' },
  favoriteButton: { padding: 8 },
});

export default PropertyListScreen;
