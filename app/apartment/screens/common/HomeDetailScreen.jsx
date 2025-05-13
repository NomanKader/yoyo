import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import theme from '../../style/colors';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import {useFocusEffect} from '@react-navigation/native';
import DividerComponent from '../../components/Divider/DividerComponent';

const amenityIcons = {
  TV: 'tv-outline',
  Wifi: 'wifi-outline',
  Stove: 'flame-outline',
  AC: 'snow-outline',
  Heater: 'thermometer-outline',
  Oven: 'pizza-outline',
  Dishwasher: 'water-outline',
  Refrigerator: 'cube-outline',
  Gym: 'barbell-outline',
  'Swimming Pool': 'water-outline',
};

const featureIcons = {
  Pool: 'water-outline',
  Garden: 'leaf-outline',
  'Security 24 Hours': 'shield-checkmark-outline',
  Sauna: 'flame-outline',
  GYM: 'barbell-outline',
};

const property = {
  id: 1,
  propertyName: 'Skyview Residence',
  location: 'Yangon, Myanmar',
  pricePerMonth: 750000,
  propertyTypeName: 'Apartment',
  bedroom: 2,
  bathroom: 1,
  amenities: ['Wifi', 'TV', 'AC'],
  propertyDetailImage:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  apartmentOwnerName: 'John Doe',
  apartmentOwnerPhone: '+959123456789',
  propertyDetailFurniture: 'Fully Furnished',
  propertyDetailUnits: 12,
  propertyDetailCreatedDate: '2024-01-15',
  propertyDetailFloor: '5th',
  propertyDetailSize: 85,
  projectDetailName: 'Skyview Project',
  projectDetailUnits: 30,
  projectDetailFurniture: 'Furnished',
  projectDetailDeveloper: 'Yoma Group',
  projectDetailFloor: '12th',
  projectDetailSize: 150,
  projectDetailImage:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  projectDetailFeatures: ['GYM', 'Garden', 'Security 24 Hours'],
};

const PropertiesDetailsScreen = ({navigation, route}) => {
  const {item} = route.params || {};
  console.log('item', item);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const amenities = property.amenities || [];
  const projectDetailFeatures = property.projectDetailFeatures || [];

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.submitted) {
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 2000);
      }
    }, [route.params]),
  );

  const formatFullDate = dateString => {
    return dateString ? moment(dateString).format('MMMM D, YYYY') : '';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backIcon}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home Detail</Text>
      </View>
      <View style={{marginBottom: 20}}>
        <DividerComponent />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Image */}
        <Image
          source={{uri: property.propertyDetailImage}}
          style={styles.propertyImage}
        />

        {/* Title & Price */}
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.propertyTitle}>{property.propertyName}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="gray" />
              <Text style={styles.locationText}>{property.location}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              MMK {property.pricePerMonth.toLocaleString()}
            </Text>
            <Text style={styles.priceSubText}>/month</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureThreeItem}>
            <Ionicons name="business-outline" size={20} color="black" />
            <Text style={styles.featureText}>{property.propertyTypeName}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.featureThreeItem}>
            <Ionicons name="bed-outline" size={20} color="black" />
            <Text style={styles.featureText}>{property.bedroom} Bed</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.featureThreeItem}>
            <Ionicons name="water-outline" size={20} color="black" />
            <Text style={styles.featureText}>{property.bathroom} Bath</Text>
          </View>
        </View>

        {/* Agent Info */}
        <View style={styles.agentCard}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
            }}
            style={styles.agentImage}
          />
          <View style={styles.agentInfo}>
            <Text style={styles.agentName}>{property.apartmentOwnerName}</Text>
            <Text style={styles.agentTitle}>Real Estate Broker</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${property.apartmentOwnerPhone}`)
            }>
            <Ionicons name="call-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          A beautiful apartment in the heart of the city with modern amenities,
          stunning views, and easy access to shopping and restaurants.
        </Text>

        {/* Amenities */}
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {amenities.map((item, index) => {
            const iconName = amenityIcons[item];
            if (!iconName) return null;
            return (
              <View key={index} style={styles.amenityItem}>
                <Ionicons name={iconName} size={20} color="black" />
                <Text style={styles.amenityText}>{item}</Text>
              </View>
            );
          })}
        </View>

        {/* Basic Info */}
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.basicInfoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Property Type</Text>
            <Text style={styles.infoValue}>{property.propertyTypeName}</Text>
            <Text style={styles.infoLabel}>Number of Units</Text>
            <Text style={styles.infoValue}>{property.propertyDetailUnits}</Text>
            <Text style={styles.infoLabel}>Furniture</Text>
            <Text style={styles.infoValue}>
              {property.propertyDetailFurniture}
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Date listed</Text>
            <Text style={styles.infoValue}>
              {formatFullDate(property.propertyDetailCreatedDate)}
            </Text>
            <Text style={styles.infoLabel}>Floor</Text>
            <Text style={styles.infoValue}>{property.propertyDetailFloor}</Text>
            <Text style={styles.infoLabel}>Size</Text>
            <Text style={styles.infoValue}>
              {property.propertyDetailSize} SqM
            </Text>
          </View>
        </View>

        {/* Map */}
        <Text style={styles.sectionTitle}>Maps</Text>
        <Image
          source={{
            uri: 'https://static-maps.yandex.ru/1.x/?ll=100.5690,13.7309&z=15&size=600,300&l=map&pt=100.5690,13.7309,pm2rdl',
          }}
          style={styles.mapImage}
        />

        {/* Project Info */}
        <Text style={styles.sectionTitle}>Project Details</Text>
        <Image
          source={{uri: property.projectDetailImage}}
          style={styles.projectImage}
        />
        <View style={styles.basicInfoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Project Name</Text>
            <Text style={styles.infoValue}>{property.projectDetailName}</Text>
            <Text style={styles.infoLabel}>Property Type</Text>
            <Text style={styles.infoValue}>{property.propertyTypeName}</Text>
            <Text style={styles.infoLabel}>Number of Units</Text>
            <Text style={styles.infoValue}>{property.projectDetailUnits}</Text>
            <Text style={styles.infoLabel}>Furniture</Text>
            <Text style={styles.infoValue}>
              {property.projectDetailFurniture}
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Developer</Text>
            <Text style={styles.infoValue}>
              {property.projectDetailDeveloper}
            </Text>
            <Text style={styles.infoLabel}>Floor</Text>
            <Text style={styles.infoValue}>{property.projectDetailFloor}</Text>
            <Text style={styles.infoLabel}>Size</Text>
            <Text style={styles.infoValue}>
              {property.projectDetailSize} SqM
            </Text>
          </View>
        </View>

        {/* Project Features */}
        <Text style={styles.sectionTitle}>Project Features</Text>
        <View style={styles.featuresContainer}>
          {projectDetailFeatures.map((feature, index) => {
            const iconName = featureIcons[feature];
            if (!iconName) return null;
            return (
              <View key={index} style={styles.featureItem}>
                <Ionicons name={iconName} size={20} color="black" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            );
          })}
        </View>

        {/* Request Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => console.log('Open Chat')}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <DefaultButtonComponent
            title="Request Info"
            onPress={() => Alert.alert("Reuqest Info requested")}
            backgroundColor="#1E40AF"
            buttonStyle={styles.requestButton}
          />
        </View>
      </ScrollView>

      {/* Inquiry Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="checkmark-circle" size={50} color="#1E40AF" />
            <Text style={styles.modalTitle}>Thanks for your inquiry</Text>
            <Text style={styles.modalMessage}>
              We'll contact you soon. Explore more properties in our app while
              you wait.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PropertiesDetailsScreen;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', color: '#000', marginTop: 10},
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 15,
  },
  chatButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.textGray,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  unitList: {
    paddingBottom: 20,
  },
  availableUnitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
  },
  agentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 2, // Adds shadow for better design
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  backIcon: {
    ...StyleSheet.absoluteFillObject,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  infoColumn: {
    width: '45%',
  },
  locationText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  basicInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoColumn: {
    width: '45%',
  },
  infoLabel: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  mapImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.textGray,
  },
  priceContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  priceSubText: {
    fontSize: 12,
    color: 'gray',
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  propertyImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#007BFF',
    marginTop: 5,
  },
  agentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  agentInfo: {
    flex: 1,
    marginLeft: 10,
  },
  agentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  agentTitle: {
    fontSize: 12,
    color: 'gray',
  },
  callIcon: {
    padding: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  amenities: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },

  projectImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 15,
  },
  unitPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 2,
  },
  requestButton: {
    flex: 1,
    height: 50,
    marginLeft: 10,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginBottom: 10,
  },
  featureThreeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  unitCard: {
    backgroundColor: theme.colors.textLight,
    borderRadius: 15,
    marginVertical: 15,
    paddingBottom: 10,
    elevation: 1,
    width: '48%',
    overflow: 'hidden',
  },
  unitImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 5,
  },
  unitTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  unitLocation: {
    fontSize: 12,
    color: 'gray',
    paddingHorizontal: 10,
  },
  unitPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  unitFeatures: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  featureText: {
    fontSize: 10,
    marginStart: 10,
    color: '#000',
  },
  row: {
    justifyContent: 'space-between',
  },
});
