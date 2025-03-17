import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../styles/colors';

// Dummy Data
const categories = [
  {id: '1', name: 'Bangkok', image: require('../../assets/images/bangkok.jpg')},
  {id: '2', name: 'Phuket', image: require('../../assets/images/phuket.jpg')},
  {id: '3', name: 'Hua Hin', image: require('../../assets/images/huahin.jpg')},
];

const recentlyAdded = [
  {
    id: '1',
    name: 'The Waterford Rama 4',
    location: 'Bangkok',
    price: '600k/month',
    image: require('../../assets/images/property1.jpg'),
  },
  {
    id: '2',
    name: 'The Waterford Rama 4',
    location: 'Bangkok',
    price: '600k/month',
    image: require('../../assets/images/property2.jpg'),
  },
  {
    id: '3',
    name: 'The Waterford Rama 4',
    location: 'Bangkok',
    price: '600k/month',
    image: require('../../assets/images/property2.jpg'),
  },
];

export default function HomeTabScreen({navigation}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <ImageBackground
          source={require('../../assets/images/backgroundImage.png')}
          style={styles.headerBackground}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton}>
              <Icon name="menu" size={26} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={require('../../assets/images/profileImage.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity> 
            
          </View>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.headerTitle}>
              Your Property Hub for All Needs
            </Text>        
            </View>
          

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Icon
              name="search"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput placeholder="Search here" style={styles.searchInput} />
            <TouchableOpacity>
              <Icon name="sliders" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{item.name}</Text>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          )}
        />

        {/* Recently Added Section */}
        <Text style={styles.sectionTitle}>Recently Added</Text>
        <FlatList
          data={recentlyAdded}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.propertyCard}>
              {/* Property Image */}
              <Image source={item.image} style={styles.propertyImage} />

              {/* Favorite & Compare Icons */}
              <View style={styles.propertyIcons}>
                <TouchableOpacity style={styles.iconCircle}>
                  <Icon name="heart" size={18} color="#D72638" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconCircle}>
                  <Icon name="repeat" size={18} color="#007BFF" />
                </TouchableOpacity>
              </View>

              {/* Property Details */}
              <Text style={styles.propertyName}>{item.name}</Text>
              <Text style={styles.propertyLocation}>📍 {item.location}</Text>
              <Text style={styles.propertyPrice}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerBackground: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',     
    marginLeft: 10,
    marginTop:40,
    textAlign:'left'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    marginHorizontal: 15,
    marginTop: 70,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 60,
    marginHorizontal: 20,
  },
  categoryCard: {
    width: 120,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    marginTop: 10,
    marginHorizontal: 18,
  },
  categoryImage: {
    width: '100%',
    height: 80,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  viewAll: {
    fontSize: 12,
    color: '#007BFF',
    textAlign: 'center',
  },
  propertyCard: {
    width: 160,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 10,
    marginHorizontal: 5,
    position: "relative",
    marginBottom:20
  },
  propertyImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  propertyIcons: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    gap: 8, // Spacing between icons
  },
  iconCircle: {
    backgroundColor: "#FFF",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
    marginTop:5
  },
  propertyName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  propertyLocation: {
    fontSize: 12,
    color: "#777",
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007BFF",
  },
});
