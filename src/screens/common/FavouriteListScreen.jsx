import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import propertyImage1 from '../../assets/images/property1.jpg'
import propertyImage2 from '../../assets/images/property2.jpg'
// Sample Favorite Data
const favoriteProperties = [
  {
    id: "1",
    name: "Citi Smart Sukhumvit 18",
    location: "Phrom Phong, Bangkok",
    price: "$1,200 / month",
    image: propertyImage1,
    beds: "2 Bed",
    bath: "1 Bath",
    type: "Condo",
  },
  {
    id: "2",
    name: "The Waterford Rama 4",
    location: "Phra Khanong Tai, Bangkok",
    price: "$900 / month",
    image: propertyImage2,
    beds: "2 Bed",
    bath: "1 Bath",
    type: "Condo",
  },
  {
    id: "3",
    name: "Citi Smart Sukhumvit 18",
    location: "Phrom Phong, Bangkok",
    price: "$1,200 / month",
    image: propertyImage1,
    beds: "2 Bed",
    bath: "1 Bath",
    type: "Condo",
  },
];

export default function FavouriteListScreen({ navigation }) {
  const renderPropertyItem = ({ item }) => (
    <TouchableOpacity style={styles.propertyCard}>
      <Image source={item.image} style={styles.propertyImage} />
      <View style={styles.heartIconContainer}>
        <Icon name="heart" size={18} color="red" />
      </View>
      <View style={styles.compareIconContainer}>
        <Icon name="repeat" size={18} color="#007BFF" />
        {/* <Image source={require('../../assets/icons/compareIcon.png')} style={{width:30,height:30}} /> */}
      </View>

      <Text style={styles.propertyName}>{item.name}</Text>
      <Text style={styles.propertyLocation}>{item.location}</Text>
      <Text style={styles.propertyPrice}>{item.price}</Text>
      <View style={styles.propertyDetails}>
        <Text style={styles.propertyType}>{item.type}</Text>
        <Text style={styles.propertyBeds}> {item.beds}</Text>
        <Text style={styles.propertyBath}> {item.bath}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Favourite Properties */}
      <FlatList
        data={favoriteProperties}
        keyExtractor={(item) => item.id}
        renderItem={renderPropertyItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  propertyCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 10,    
    overflow: "hidden",
    marginBottom: 15,
    padding: 10,    
    // Elevation for Android
    elevation: 3, // You can adjust this value                    
},
  propertyImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  heartIconContainer: {
    position: "absolute",
    top: 10,
    right: 40,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 5,
  },
  compareIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 5,
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
    marginTop: 5,
  },
  propertyDetails: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
  },
  propertyType: {
    fontSize: 12,
    color: "#555",
  },
  propertyBeds: {
    fontSize: 12,
    color: "#555",
  },
  propertyBath: {
    fontSize: 12,
    color: "#555",
  },
});

