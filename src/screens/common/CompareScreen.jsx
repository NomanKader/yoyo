import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

// Sample Data for Comparison
const propertiesToCompare = [
  {
    id: "1",
    image: require("../../assets/images/property1.jpg"),
    name: "The Waterford Rama 4",
    location: "Phra Khanong Tai, Bangkok",
    type: "Condo",
    bedrooms: "2 Beds",
    bathrooms: "1 Bath",
    rentPrice: "$900",
    salePrice: "-",
    floor: "-",
    size: "800 Sqm",
  },
  {
    id: "2",
    image: require("../../assets/images/property2.jpg"),
    name: "Citi Smart Sukhumvit 18",
    location: "Pattaya North, Chon Buri",
    type: "Condo",
    bedrooms: "3 Beds",
    bathrooms: "1 Bath",
    rentPrice: "$850",
    salePrice: "-",
    floor: "5",
    size: "1,400 Sqm",
  },
  {
    id: "3",
    image: require("../../assets/images/property2.jpg"),
    name: "Citi Smart Sukhumvit 18",
    location: "Pattaya North, Chon Buri",
    type: "Condo",
    bedrooms: "3 Beds",
    bathrooms: "1 Bath",
    rentPrice: "$850",
    salePrice: "-",
    floor: "5",
    size: "1,400 Sqm",
  },
];

export default function CompareScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compare</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Horizontal Scroll for Comparison */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {propertiesToCompare.map((property) => (
          <View key={property.id} style={styles.propertyCard}>
            {/* Property Image */}
            <Image source={property.image} style={styles.propertyImage} />

            {/* Property Details */}
            <View style={styles.propertyDetails}>
              <Text style={styles.propertyLabel}>Property Name</Text>
              <Text style={styles.propertyValue}>{property.name}</Text>

              <Text style={styles.propertyLabel}>Location</Text>
              <Text style={styles.propertyValue}>{property.location}</Text>

              <Text style={styles.propertyLabel}>Property Type</Text>
              <Text style={styles.propertyValue}>{property.type}</Text>

              <Text style={styles.propertyLabel}>Bedrooms</Text>
              <Text style={styles.propertyValue}>{property.bedrooms}</Text>

              <Text style={styles.propertyLabel}>Bathrooms</Text>
              <Text style={styles.propertyValue}>{property.bathrooms}</Text>

              <Text style={styles.propertyLabel}>Price for Rent</Text>
              <Text style={styles.propertyValue}>{property.rentPrice}</Text>

              <Text style={styles.propertyLabel}>Price for Sale</Text>
              <Text style={styles.propertyValue}>{property.salePrice}</Text>

              <Text style={styles.propertyLabel}>Floor</Text>
              <Text style={styles.propertyValue}>{property.floor}</Text>

              <Text style={styles.propertyLabel}>Size</Text>
              <Text style={styles.propertyValue}>{property.size}</Text>
            </View>

            {/* More Details Button */}
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>More Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  propertyCard: {
    width: 250,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginRight: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  propertyImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  propertyDetails: {
    marginBottom: 10,
  },
  propertyLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#777",
  },
  propertyValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailsButton: {
    backgroundColor: "#0047AB",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  detailsButtonText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
  },
});

